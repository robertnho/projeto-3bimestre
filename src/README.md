# AV2 — API Marketplace Enxuto (Node.js + Express + Prisma + MySQL)

API enxuta para avaliação de DSW (3º bimestre).  
Modelagem:
- **User** (1) — **Store** (1)  → relação **1–1**
- **Store** (1) — **Product** (N) → relação **1–N**

Banco: **MySQL (AlwaysData)** usando `prisma db push`.

---

## 🔧 Requisitos
- Node 18+ (recomendado 20+)
- MySQL (remoto AlwaysData)
- Prisma

---

## 📦 Instalação
```bash
npm i
npm i -D prisma nodemon
npm i express cors dotenv @prisma/client
