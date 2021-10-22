import express from 'express';
import { mapOder } from '*/utilities/sorts';
const app = express();

app.get('/', (req, res) => {
  res.end('<h1>Hello world</h1>');
});

const hostname = 'localhost';
const port = 8000;
app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on ', `http://${hostname}:${port}`);
});
