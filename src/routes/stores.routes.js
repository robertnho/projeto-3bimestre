// src/routes/stores.routes.js
import { Router } from "express";
import prisma from "../db.js";

const router = Router();

// CREATE Store (1-1 com User via userId)
router.post("/", async (req, res, next) => {
  try {
    const { name, userId } = req.body;
    if (!name || !userId) throw new Error("name e userId são obrigatórios");
    const store = await prisma.store.create({
      data: { name, userId: Number(userId) },
    });
    res.status(201).json(store);
  } catch (e) { next(e); }
});

// READ Store por id (com user + products)
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const store = await prisma.store.findUnique({
      where: { id },
      include: { user: true, products: true },
    });
    if (!store) return res.status(404).json({ error: "Loja não encontrada" });
    res.json(store);
  } catch (e) { next(e); }
});

// UPDATE Store
router.put("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    if (!name) throw new Error("name é obrigatório");
    const updated = await prisma.store.update({ where: { id }, data: { name } });
    res.json(updated);
  } catch (e) { next(e); }
});

// DELETE Store
router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.store.delete({ where: { id } });
    res.status(204).send();
  } catch (e) { next(e); }
});

// LIST todas
router.get("/", async (req, res, next) => {
  try {
    const stores = await prisma.store.findMany({
      include: { user: true, products: true },
    });
    res.json(stores);
  } catch (e) { next(e); }
});

export default router;
