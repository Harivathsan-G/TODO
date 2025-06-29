const express = require("express");
const cors = require("cors");
const TodoModel = require("./models/Todo");
const connection = require("./db");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // your frontend
    credentials: true, // allow cookies/auth headers
  })
);

app.use(express.json());

connection();

app.use("/signup", signupRoute);
app.use("/login", loginRoute);

app.post("/add", (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  TodoModel.findByIdAndUpdate(id, { task: task })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(5000, console.log("Server listening on port: 5000"));

module.exports = app;
