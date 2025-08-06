import xlsx from 'xlsx';
import Expense from '../models/Expense.js'

export const addExpense = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const {icon, category, amount, date} = req.body;

        if(!source || !amount || !date) {
            return res.status(400).json({message: "All fields are required"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });
        await newExpense.save();
        res.status(200).json(newExpense)
    } catch (err) {
        res.status(500).json({message: "server error"})
        next(err)
    }
};

export const getAllExpense = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId}).sort({date: -1});
        res.json(expense);
    } catch (err) {
        res.status(500).json({message: "Server Error"})
        next(err)
    }
};

export const deleteExpense = async (req, res, next) => { 
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense deleted successfully"});
    } catch (err) {
        res.status(500).json({message: "Server Error"})
        next(err)
    }
};

export const downloadExpenseExcel = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

       
        const data = expense.map((item) => ({
            category: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], 
        }));

        
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        
        xlsx.utils.book_append_sheet(wb, ws, "expense");

       
        const filePath = "expense_details.xlsx";
        xlsx.writeFile(wb, filePath);

        res.download(filePath);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server Error"})
        next(err)
    }
};






