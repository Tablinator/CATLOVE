import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Example: GET /cat → gets a random cat image from CATAAS
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

// Example: /cat/says/<text>
app.get("/cat/says/:text", async (req, res) => {
    const text = req.params.text;
    try {
        const response = await fetch(`https://cataas.com/cat/says/${text}`);
        const buffer = await response.arrayBuffer();

        res.setHeader("Content-Type", response.headers.get("content-type"));
        res.send(Buffer.from(buffer));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch speaking cat" });
    }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
