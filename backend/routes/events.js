import express from "express";

const router = express.Router();

// Lista de eventos (GET)
router.get("/", (req, res) => {
  res.json([
    { id: 1, dia: 5, titulo: "Mutirão Solidário", local: "Zona Sul", desc: "Ação comunitária" },
    { id: 2, dia: 2, titulo: "Doação de Sangue", local: "Hospital", desc: "Campanha de saúde" }
  ]);
});

// Criar evento (POST)
router.post("/", (req, res) => {
  const novoEvento = req.body;
  // Aqui você poderia salvar no banco de dados
  res.status(201).json({ message: "Evento criado com sucesso!", evento: novoEvento });
});

export default router;
