import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import arcjetMiddleware from './middlewares/arcjcetMiddleware.js';
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js';

// import cookieParser from 'cookie-parser';

// Add this line to load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(cookieParser());
app.use(arcjetMiddleware)
// Middleware to handle CORS
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/v1/auth", authRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(errorMiddleware);
app.use

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
