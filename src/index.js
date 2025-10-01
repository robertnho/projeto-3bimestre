// src/index.js
import express from "express";
import cors from "cors";
import "dotenv/config";

import storesRoutes from "./routes/stores.routes.js";
import productsRoutes from "./routes/products.routes.js";
import { errorHandler } from "./middlewares/error.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true, service: "Marketplace Enxuto API" }));

app.use("/stores", storesRoutes);
app.use("/products", productsRoutes);

// middleware de erro por último
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API ouvindo em http://localhost:${PORT}`));
