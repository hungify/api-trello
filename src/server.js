import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.end("<h1>Hello world</h1>");
});

const hostname = "localhost";
const port = 8000;
app.listen(port, hostname, () => {
  console.log("Server running on ", `http://${hostname}:${port}`);
});
