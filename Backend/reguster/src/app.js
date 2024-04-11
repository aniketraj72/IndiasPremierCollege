const cors = require("cors");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
app.use(cors());
require("./db/conn");

const Register = require("./models/registers");
const async = require("hbs/lib/async");

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/templates/views"));
hbs.registerPartials(path.join(__dirname, "templates/views"));
hbs.registerPartials(path.join(__dirname, "templates/partials"));

app.use(
  express.static(
    path.join(__dirname, "/Frontend/Online-Educational-Website-main/dist")
  )
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "FrontendOnline-Educational-Website-main",
      "dist",
      "index.html"
    )
  );
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  try {
    console.log("register req" + req.body.email);
    const registerEmployee = new Register({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    const registered = await registerEmployee.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const useremail = await Register.findOne({ email: email });

    console.log(req.body);
    console.log(useremail);
    if (useremail.password === password) {
      console.log("Password correct");
      res.status(200).json({ authenticated: true });
    } else {
      res.send("password is not matching");
    }
  } catch (error) {
    res.status(400).send("invalid email");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port no ${port}`);
});
