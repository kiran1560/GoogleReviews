require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const API_KEY = process.env.GOOGLE_KEY;
  const PLACE_ID = process.env.PLACE_ID;

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    let reviews = data.result?.reviews || [];

  
    reviews = reviews.filter(r => r.rating >= 4).slice(0, 10);

    res.json({
      name: data.result?.name,
      rating: data.result?.rating,
      total_reviews: data.result?.user_ratings_total,
      reviews
    });

  } catch (err) {
    res.json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
