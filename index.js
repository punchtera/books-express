const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// create application/json parser
const jsonParser = bodyParser.json();

const port = 3000;

const books = [
  {
    id: 1,
    title: "the first book",
  },
];

app.get("/books", (req, res) => {
  res.json({ books });
});

app.post("/books", jsonParser, function (req, res) {
  if (!req.body) res.sendStatus(400);

  const newBook = req.body;
  books.push(newBook);
  res.send("pushed");
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const filteredBook = books.filter((el) => el.id == bookId);
  res.json({ book: filteredBook });
});

app.put("/books/:id", jsonParser, (req, res) => {
  if (!req.body) res.sendStatus(400);

  const editedBook = req.body;

  const filteredBooks = books.filter((el) => el.id != editedBook.id);
  books = [filteredBooks, editedBook];

  res.send("Got a PUT request at /user");
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const filteredBooks = books.filter((el) => el.id != bookId);
  books = filteredBooks;
  res.send("deleted");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
