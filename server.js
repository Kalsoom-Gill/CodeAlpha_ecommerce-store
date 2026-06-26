const bcrypt = require("bcryptjs");
const db = require("./db");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/index.html");
});


app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users(name,email,password) VALUES(?,?,?)";

  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) {
      return res.send("Registration Failed");
    }

    res.send("Registration Successful");
  });
});app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.send("Error");
    }

    if (result.length === 0) {
      return res.send("User Not Found");
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.send("Login Successful");
    } else {
      res.send("Wrong Password");
    }
  });
});
const path = require("path");
app.get("/register.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {
    if (err) {
      return res.json([]);
    }

    res.json(result);
  });
});
app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/product/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM products WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err || result.length === 0) {
      return res.send("Product Not Found");
    }

    const product = result[0];

    res.send(`

<h1>${product.name}</h1>

<p>Price: Rs ${product.price}</p>

<p>${product.description}</p>

<a href="/index.html">
Back
</a>

`);
  });
});

app.get("/cart.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "cart.html"));
});

app.get("/checkout.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "checkout.html"));
});

app.post("/place-order", (req, res) => {
  const total = 50000;

  const sql = "INSERT INTO orders(user_id,total) VALUES(?,?)";

  db.query(sql, [1, total], (err, result) => {
    if (err) {
      return res.send("Order Failed");
    }

    res.send("Order Placed Successfully");
  });
});
