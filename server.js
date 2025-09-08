// server.js
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Variáveis de ambiente
const BOT_TOKEN = process.env.BOT_TOKEN; // token do BotFather
const CHAT_ID = process.env.CHAT_ID;     // ID do grupo ou usuário que receberá as mensagens
const PORT = process.env.PORT || 3000;   // Render define a porta automaticamente

// Endpoint para receber localização do front-end
app.post("/send-location", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude e longitude são obrigatórios" });
    }

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendLocation`;

    await axios.post(url, {
      chat_id: CHAT_ID,
      latitude: latitude,
      longitude: longitude,
    });

    res.json({ success: true, message: "Localização enviada com sucesso!" });
  } catch (err) {
    console.error("Erro ao enviar localização:", err.response?.data || err.message);
    res.status(500).json({ error: "Erro ao enviar localização" });
  }
});

// Endpoint raiz (teste rápido)
app.get("/", (req, res) => {
  res.send("✅ Bot BackScan rodando no Render!");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
