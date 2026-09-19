import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Importar suas rotas
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// Rotas da API
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);

// Servir frontend buildado
app.use(express.static(path.join(__dirname, "../fronted/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../fronted/dist/index.html"));
});

// Porta dinâmica para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
