const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
 
// Mock Database of Products
const products = {
  "laptop": { name: "High-End Workstation", price: 2500, region: "Conflict Zone" },
  "shirt": { name: "Cotton T-Shirt", price: 30, region: "Stable Zone" }
};
 
app.get('/api/analyze/:item', async (req, res) => {
  const item = req.params.item;
  const product = products[item];

  if (!product) {
    return res.status(404).json({ error: "Item not found" });
  }

  const newsHeadline = item === "laptop" 
    ? "War escalates in chip manufacturing hub, factories closing down." 
    : "Local textile markets see record harvest and peace.";

  // --- MOCK API RESPONSE START ---
  // Manually set a score so you don't need a real API key for testing
  const sentimentScore = item === "laptop" ? -0.85 : 0.45; 
  // --- MOCK API RESPONSE END ---

  const isUrgent = sentimentScore < -0.3 && product.region === "Conflict Zone";

  res.json({
    ...product,
    newsHeadline,
    sentimentScore,
    isUrgent,
    recommendation: isUrgent ? "BUY NOW: Prices likely to spike" : "PRICE STABLE: Buy at leisure"
  });
});

 
app.listen(5000, () => console.log("Logic Server on Port 5000"));