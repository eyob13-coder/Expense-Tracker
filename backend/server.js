import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import arcjetMiddleware from './middlewares/arcjcetMiddleware.js';
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js';
import incomeRoutes from './routes/incomeRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import cookieParser from 'cookie-parser';



dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(arcjetMiddleware)
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());




app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json());


const PORT = process.env.PORT || 7070;

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(errorMiddleware);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//date example
//2025-01-01
//2025-01-01T00:00:00.000Z
//2025-01-01T00:00:00.000Z
//2025-01-01T00:00:00.000Z

