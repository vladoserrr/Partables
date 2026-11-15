require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = Number(process.env.PORT || 3000);

app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, app: "Partables", mode: "prototype", timestamp: new Date().toISOString() });
});

app.get("/api/config", (_req, res) => {
  res.json({
    appName: "PARTABLES",
    timezone: process.env.TZ || "Europe/Moscow",
    games: 12,
    paymentsEnabled: false,
    note: "Платежи и игровые ставки включаются только после проверки правил Telegram и юридических требований."
  });
});

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.listen(port, "0.0.0.0", () => {
  console.log(`Partables listening on ${port}`);
});
