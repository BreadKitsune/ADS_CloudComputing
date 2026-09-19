import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware da API
app.use(express.json());

// Suas rotas da API
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);

// Servir frontend buildado
app.use(express.static(path.join(__dirname, "../fronted/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../fronted/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
