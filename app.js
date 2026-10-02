const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expenses');
const incomeRoutes = require('./routes/income');
const { notFound, errorHandler } = require('./middleware/error-handler');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/', (_req, res) => res.json({
  success: true,
  message: 'Expense Tracker REST API',
  endpoints: {
    users: '/users',
    expenses: '/expenses',
    income: '/income',
  },
}));

app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);
app.use('/income', incomeRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
