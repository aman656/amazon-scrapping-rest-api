const express = require("express");
const request = require("request-promise");
const PORT = process.env.PORT || 5000;

const scrappingUrl = (api_key) =>
  `http://api.scraperapi.com?api_key=${api_key}&autoparse=true`;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Response Send");
});

app.get("/product/:id", async (req, res) => {
  const { api_key } = req.query;
  const { id } = req.params;
  try {
    const response = await request(
      `${scrappingUrl(api_key)}&url=http://www.amazon.com/dp/${id}`
    );
    res.send(JSON.parse(response));
  } catch (err) {}
});
app.get("/product/:id/reviews", async (req, res) => {
  const { api_key } = req.query;
  const { id } = req.params;
  try {
    const response = await request(
      `${scrappingUrl(api_key)}&url=http://www.amazon.com/product-reviews/${id}`
    );
    res.send(JSON.parse(response));
  } catch (err) {}
});

app.get("/product/search/:name", async (req, res) => {
  const { name } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${scrappingUrl(api_key)}&url=http://www.amazon.com/s?k=${name}`
    );
    res.send(JSON.parse(response));
  } catch (err) {}
});

app.listen(PORT, () => {
  console.log(`Server running on 5000`);
});
