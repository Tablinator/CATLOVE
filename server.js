import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, "public")));

// Allow CORS from any origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// GET /cat
app.get("/cat", async (req, res) => {
  try {
    const response = await fetch("https://cataas.com/cat");
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", response.headers.get("content-type"));
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cat" });
  }
});

// GET /cat/says/:text
app.get("/cat/says/:text", async (req, res) => {
  try {
    const text = encodeURIComponent(req.params.text);
    const response = await fetch(`https://cataas.com/cat/says/${text}`);
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", response.headers.get("content-type"));
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cat" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
