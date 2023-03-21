const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();
const path = require("path");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const authRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/user");
const adminRouter = require("./routes/api/admin");

// app.use(cors(corsOptions));
app.use(cors({origin:["https://kesa-bank-sigma.vercel.app"], credentials: true}))
// app.use(cors({origin:["http://localhost:3000"], credentials: true}))

const corsConfig = {
  origin: true,
  credentials: true
}

app.options("https://kesa-bank-sigma.vercel.app", cors(corsConfig))
// app.options("http://localhost:3000/", cors(corsConfig))

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("<h1>Kesa Bank Backend</h1>");
});
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.listen(PORT, () => console.log("server running on port: " + PORT));

module.exports = app