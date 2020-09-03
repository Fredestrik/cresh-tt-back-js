import express from 'express';
import Dotenv from 'dotenv';
import Ping from './ping'
import Customers from './customers'
import Transactions from './transactions'

Dotenv.config()

const app = express();
app.use(express.json())
const PORT = 8000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.use('/ping', Ping)
app.use('/customers', Customers)
app.use('/transactions', Transactions)
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  console.log('[database]: ' + process.env.PGDATABASE)
});
