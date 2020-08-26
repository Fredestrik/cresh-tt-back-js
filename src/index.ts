import express from 'express';
import Ping from './ping'

const app = express();
const PORT = 8000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.use('/ping', Ping)
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});