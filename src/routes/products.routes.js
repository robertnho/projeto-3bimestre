// src/routes/products.routes.js
import { Router } from "express";
import prisma from "../db.js";

const router = Router();

// CREATE Product
router.post("/", async (req, res, next) => {
  try {
    const { name, price, storeId } = req.body;
    if (!name || price == null || !storeId) {
      throw new Error("name, price e storeId são obrigatórios");
    }
    const product = await prisma.product.create({
      data: { name, price: Number(price), storeId: Number(storeId) },
    });
    res.status(201).json(product);
  } catch (e) { next(e); }
});

// READ todos (com store + user)
router.get("/", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { store: { include: { user: true } } },
    });
    res.json(products);
  } catch (e) { next(e); }
});

// READ por id (com store + user)
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id },
      include: { store: { include: { user: true } } },
    });
    if (!product) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(product);
  } catch (e) { next(e); }
});

// UPDATE Product
router.put("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, price } = req.body;
    if (!name && price == null) throw new Error("Informe name ou price");
    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(name ? { name } : {}),
        ...(price != null ? { price: Number(price) } : {}),
      },
    });
    res.json(updated);
  } catch (e) { next(e); }
});

// DELETE Product
router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (e) { next(e); }
});

export default router;
