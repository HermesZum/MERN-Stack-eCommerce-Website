import express from 'express';
import data from "./data/data.js";

const app = express();

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
    const product = data.products.find(x => x.slug === req.params.slug);

    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send( { message: 'Product Not Found!' } );
    }
});

const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serve at http://${ HOST }:${ PORT }`)
});