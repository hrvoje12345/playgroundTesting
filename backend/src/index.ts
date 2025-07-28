import express from 'express';

const app = express();
const port = 3003;

app.get('/', (_req, res) => {
  res.send('Initial');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});