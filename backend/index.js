const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const port = process.env.PORT  || 5000

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongoUrl =
  "mongodb+srv://hafizi:hafizi@cluster0.kejuob9.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userdetails");

const User = mongoose.model("UserInfo");
app.post("/register", async (req, res) => {
  const { names, email, password, birthday, academic } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      names,
      email,
      password: encryptedPassword,
      birthday,
      academic,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});


app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
console.log(user)
console.log(password)
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET);
  
      if (res.status(201)) {
        console.log("ok")
        return res.json({ status: "ok", data: token });
      } else {
        console.log("not ok")
        return res.json({ error: "error" });
      }
    } else {
      res.json({ status: "error", error: "InvAlid Password" });
    }
  } else {
    res.json({ status: "error", error: "User not found" });
  }
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
