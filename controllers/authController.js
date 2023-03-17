const Prisma = require("@prisma/client").PrismaClient;
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new Prisma();

exports.registerUser = async (req, res) => {
  const { password, fullName, phoneNumber, email } = req.body;
  // console.log(`${password} ${fullName} ${phoneNumber, email}`)
  if (!password || !fullName || !phoneNumber || !email) {
    return res.status(400).json({ message: "All fields are required" });
  } else {
    // console.log(`to prisma ${password}, ${fullName}, ${phoneNumber} and ${email}`)
    try {
      const register = await prisma.user.create({
        data: {
          password_hash: CryptoJS.AES.encrypt(
            password,
            process.env.PASSWORD_SECRET).toString(),
          fullName, 
          phoneNumber,
          email,
        },
      });
      const {password_hash, ...rest} = register
      res.status(201).json({...rest, "message": `${register.fullName} registered successfully`});
    } catch (error) {
      console.log(error)
      if (error.code === "P2002") {
        return res
          .status(500)
          .json({ message: "A user with this email already exists" });
      }
      res.status(500).json({ error, message: error.message });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(`${email} and ${password}`)
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    // console.log(user);
    if (!user) {return res.status(401).json({message: "Email address is not registered"})};
    // user.account_no = 1002784563 + user.account_no
    const { password_hash, ...rest } = user;
    const unhashedPassword = CryptoJS.AES.decrypt(
      password_hash,
      process.env.PASSWORD_SECRET
    ).toString(CryptoJS.enc.Utf8);
    if (password !== unhashedPassword) {
      res.status(401).json({ message: "Incorrect password. Try again" });
    } else {
      const accessToken = jwt.sign(
        {
          account_no: user.account_no,
          is_admin: user.is_admin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
    rest.account_no = 1002784563 + rest.account_no
      res
        .cookie("access_token", accessToken, {
          httpOnly: true,
          // origin: "http://localhost:3000",
          origin: "https://kesa-bank-sigma.vercel.app/",
          // secure: true,
          secure: process.env.NODE_ENV === "production",
          // Access-Control-Allow-Origin: "http://localhost:3000",
          
        })
        .status(201)
        .json({ ...rest, Message: "logged in successfully" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.me = async(req, res) => {
  const token = req?.headers?.cookie?.split("=")[1];
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) 
    const {account_no} = decodedToken
    if (!account_no) {
      return res.status(401).json({success: false, message: "invalid token"})
    }
    else  {try {
    // account_no = +account_no - 1002784563
    const user = await prisma.user.findUnique({ 
      where: {account_no}
    })
    if(!user) {return res.status(401).json("Email address is not registered")};
    const { password_hash, ...rest } = user;
    const accessToken = jwt.sign(
      {
        account_no: user.account_no,
        is_admin: user.is_admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    rest.account_no = 1002784563 + rest.account_no
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(201)
      .json({ ...rest, Message: "logged in successfully" });
  }catch (err) {
    res.status(500).json(err);
  }}
}
  else {return res.status(401).json({ success: false, message: "Error! Token was not provided" })};
}

exports.logout = async(_req, res) => {
  console.log("logout")
 return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "You have successfully logged out" });
};


