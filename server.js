require('dotenv').config();

const app = require('./app');
const { initializeFirebase } = require('./config/firebase');

const port = Number(process.env.PORT) || 3000;

initializeFirebase();
app.listen(port, () => {
  console.log(`Expense Tracker API listening on port ${port}`);
});
