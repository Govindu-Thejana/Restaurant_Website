import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import itemRouter from './routes/itemRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import productRouter from './routes/productRouter.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Database connection
mongoose.connect('mongodb+srv://admin:123@cluster0.3oi6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("Connected to database"))
    .catch(err => console.error("Database connection error:", err));

app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// JWT Middleware
app.use((req, res, next) => {
    const header = req.header("Authorization");
    if (header) {
        const token = header.replace("Bearer ", "");
        jwt.verify(token, "random456", (err, decoded) => {
            if (err) {
                console.error("Invalid token:", err);
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.user = decoded;
        });
    }
    next();
});

// API Routes
app.use("/api/item", itemRouter);
app.use("/api/user", userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/food', orderRouter);
app.use('/api/products', productRouter);


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
