import xlsx from 'xlsx';
import Income from '../models/Income.js';


export const addIncome = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const {icon, source, amount, date} = req.body;

        if(!source || !amount || !date) {
            return res.status(400).json({message: "All fields are required"});
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });
        await newIncome.save();
        res.status(200).json(newIncome)
    } catch (err) {
        res.status(500).json({message: "server error"})
        next(err)
    }
};

export const getAllIncome = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId}).sort({date: -1});
        res.json(income);
    } catch (err) {
        res.status(500).json({message: "Server Error"})
        next(err)
    }
};

export const deleteIncome = async (req, res, next) => { 
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "income deleted successfully"});
    } catch (err) {
        res.status(500).json({message: "Server Error"})
        next(err)
    }
};

export const downloadIncomeExcel = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

       
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], 
        }));

        
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        
        xlsx.utils.book_append_sheet(wb, ws, "Income");

       
        const filePath = "income_details.xlsx";
        xlsx.writeFile(wb, filePath);

        res.download(filePath);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server Error"})
        next(err)
    }
};






