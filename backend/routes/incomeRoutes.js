import express from 'express';

import {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} from '../controllers/IncomeController.js';

import  authorize from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/add", authorize, addIncome);
router.get("/get", authorize, getAllIncome);
router.get("/downloadexcel", authorize, downloadIncomeExcel);
router.delete("/:id", authorize, deleteIncome);

export default router;
