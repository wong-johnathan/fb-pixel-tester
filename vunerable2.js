const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

/* ❌ SSRF (Server-Side Request Forgery) */
app.get('/fetch', async (req, res) => {
  const url = req.query.url;
  const response = await axios.get(url);
  res.send(response.data);
});

/* ❌ Open Redirect */
app.get('/redirect', (req, res) => {
  const next = req.query.next;
  res.redirect(next);
});

/* ❌ Insecure CORS configuration */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

/* ❌ Prototype Pollution */
app.post('/merge', (req, res) => {
  const obj = {};
  Object.assign(obj, req.body);
  res.json(obj);
});

app.listen(3000);
