import Income from "../models/Income.js"
import Expense from "../models/Expense.js";
import { isValidObjectId, Types } from "mongoose";


const getDashboardData = async (req, res, next) =>{
try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    //fetch total income & expense

    const totalIncome = await Income.aggregate([
        { $match: { userId: userObjectId} },
        { $group: { _id: null, total: {$sum : "$amount" } } },
    ]);

    // Get Income transaction in the last 60 days

    const last60DaysIncomeTransactions = await Income.find({
        userId,
        date: {$gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)},
    }).sort({ date: -1});

   // Get total Income for last 60Days

   const incomeLast6oDays = last60DaysIncomeTransactions.reduce(
    ( sum, tranaction) => sum + tranaction.amount, 
    0
   );

   //Get expense transaction in the last 30 days

   const last30DaysExpenseTransactions = await Expense.find({
    userId,
    date: { $gte: newDate(Date.now() -30 *24 *60 * 60 * 1000)},

   }).sort({ date: -1});

   //Get total expense for last 30days 

   const expenseLast30Days = last30DaysExpenseTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
   );

   //Fetch last 5 transactions (income + expense)

   const lastTransactioins = [
    ...(await Income.find({ userId}).sort({ date: -1}).limit(5)).map(
        (txn) => ({
            ...txn.toObject(),
            type: "income",
        })
    ),
    ...(await Expense.find( {userId}).sort({ date: -1}).limit(5)).map(
        (txn) => ({
            ...txn.toObject(),
            type: "expense",
            
        })
    ),
   ].sort((a,b) => b.date - a.date); //sort latest first

   //Final response

   res.json({
    totalBalance:
    (totalIncome(0)?.total || 0) - (totalExpense(0)?.total || 0),
    totalIncome: totalIncome(0)?.total || 0,
    totalExpense: totalExpense(0)?.total || 0,
    last30DaysExpense: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
    },

    last60DaysIncome:{
        total: incomeLast6oDays,
        transactions: last60DaysIncomeTransactions,
    },

    recentTransactions: lastTransactioins,
   });
} catch (error) {
    res.status(500).json({ message: "Server Error", error});
    next(error);
}
}

export default getDashboardData