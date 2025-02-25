const express = require("express");
const cors = require("cors");
const axios = require("axios");
const NodeCache = require("node-cache");
const app = express();
app.use(cors());

const cache = new NodeCache({ stdTTL: 60 * 5 });
const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

const fetchDataWithCache = async (endpoint, cacheKey, res) => {
  if (cache.has(cacheKey)) {
    console.log("Serving from cache:", cacheKey);
    return res.json(cache.get(cacheKey));
  }

  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};


app.get("/api/cocktails", (req, res) => {
  const searchTerm = req.query.s;
  if (!searchTerm) {
    return res.status(400).json({ error: "Missing search term" });
  }
  fetchDataWithCache(`search.php?s=${searchTerm}`, `cocktail-${searchTerm}`, res);
});
app.get("/api/cocktail", (req, res) => {
  const cocktailId = req.query.i;
  if (!cocktailId) {
    return res.status(400).json({ error: "Missing cocktail ID" });
  }
  fetchDataWithCache(`lookup.php?i=${cocktailId}`, `cocktail-id-${cocktailId}`, res);
});



app.listen(5000, () => console.log("Server running on port 5000"));
