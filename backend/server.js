import express from 'express';
import data from "./data/data.js";

const app = express();

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serve at http://${ HOST }:${ PORT }`)
});