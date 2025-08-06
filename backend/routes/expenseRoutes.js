import express from 'express';

import {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} from '../controllers/ExpenseController.js';

import  authorize from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/add", authorize, addExpense);
router.get("/get", authorize, getAllExpense);
router.get("/downloadexcel", authorize, downloadExpenseExcel);
router.delete("/:id", authorize, deleteExpense);

export default router;
