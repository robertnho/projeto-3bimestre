// src/middlewares/error.js
export function errorHandler(err, req, res, next) {
  const status = err.status || 400;
  res.status(status).json({ error: err.message || "Erro inesperado" });
}
