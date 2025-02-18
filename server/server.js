const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

app.get("/api/cocktails", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=${req.query.s}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cocktails" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
