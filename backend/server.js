import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Connected to DB!');
        })
        .catch((e) => {
            console.log(e.message);
        });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serve at http://${ HOST }:${ PORT }`)
});