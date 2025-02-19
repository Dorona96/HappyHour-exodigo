const express = require("express");
const cors = require("cors");
const axios = require("axios");
const NodeCache = require("node-cache");
const app = express();
app.use(cors());

const cache = new NodeCache({ stdTTL: 60 * 5 });
const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

app.get("/api/cocktails", async (req, res) => {
  const searchTerm = req.query.s;
  const cacheKey = `cocktail-${searchTerm}`;

  if (cache.has(cacheKey)) {
    console.log("✅ Serving from cache:", cacheKey);
    return res.json(cache.get(cacheKey));
  }

  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=${req.query.s}`);
    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cocktails" });
  }
});

app.get("/api/cocktail", async (req, res) => {
  const cocktailId = req.query.i;
  if (!cocktailId) {
    return res.status(400).json({ error: "Missing cocktail Id" });
  }
  const cacheKey = `cocktail-id-${cocktailId}`;
  if (cache.has(cacheKey)) {
    console.log("Serving from cache:", cacheKey);
    return res.json(cache.get(cacheKey));
  }
  try {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${cocktailId}`);
    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cocktail by ID" });
  }
});



app.listen(5000, () => console.log("Server running on port 5000"));
