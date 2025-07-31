import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for expenses (in a real app, you'd use a database)
let expenses = [
  {
    id: 1,
    description: 'Groceries',
    amount: 50.00,
    category: 'Food',
    date: '2024-01-15'
  },
  {
    id: 2,
    description: 'Gas',
    amount: 35.00,
    category: 'Transportation',
    date: '2024-01-14'
  }
];

// Routes

// GET all expenses
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

// GET single expense by ID
app.get('/api/expenses/:id', (req, res) => {
  const expense = expenses.find(e => e.id === parseInt(req.params.id));
  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }
  res.json(expense);
});

// POST new expense
app.post('/api/expenses', (req, res) => {
  const { description, amount, category, date } = req.body;
  
  if (!description || !amount || !category || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newExpense = {
    id: expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1,
    description,
    amount: parseFloat(amount),
    category,
    date
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// PUT update expense
app.put('/api/expenses/:id', (req, res) => {
  const { description, amount, category, date } = req.body;
  const expenseIndex = expenses.findIndex(e => e.id === parseInt(req.params.id));
  
  if (expenseIndex === -1) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  expenses[expenseIndex] = {
    ...expenses[expenseIndex],
    description: description || expenses[expenseIndex].description,
    amount: amount ? parseFloat(amount) : expenses[expenseIndex].amount,
    category: category || expenses[expenseIndex].category,
    date: date || expenses[expenseIndex].date
  };

  res.json(expenses[expenseIndex]);
});

// DELETE expense
app.delete('/api/expenses/:id', (req, res) => {
  const expenseIndex = expenses.findIndex(e => e.id === parseInt(req.params.id));
  
  if (expenseIndex === -1) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  const deletedExpense = expenses.splice(expenseIndex, 1)[0];
  res.json({ message: 'Expense deleted successfully', expense: deletedExpense });
});

// GET categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(expenses.map(e => e.category))];
  res.json(categories);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Expense Tracker API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
