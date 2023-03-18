const PrismaClient = require("@prisma/client").PrismaClient;
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");
const CryptoJS = require("crypto-js");

const prisma = new PrismaClient();

exports.getUser = async ( req, res) => {
   try {
    const user = await prisma.user.findUnique({
      where: {
        account_no: +req.params.account_no,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err, message: "User not found" });
  }
};
exports.getAllUsers = async ( req, res) => {
  console.log("working")
   try {
    const user = await prisma.user.findMany();
    // Filterm password_hash
    const list = []
    user.forEach((el) => {
      delete el.password_hash
      el.account_no += 1002784563
      console.log("🚀 ~ file: usersController.js:26 ~ user.forEach ~ el.account_bal:", el.account_bal)
      list.push(
        el
      )
    })
      console.log("🚀 ~ file: usersController.js:30 ~ user.forEach ~ el.password_hash:", list)
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err, message: "User not found" });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const account = +req.params.account_no - 1002784563
    // console.log(req.params.account_no)
    const updatedAdmin = await prisma.user.update({
      where: {
        account_no: account,
      },
      data: {
        isAdmin: req.body.isAdmin
      }
    });
    res.status(201).json(updatedAdmin);
  } catch (e) {
    // res.status(500).json({ err, message: "Operation failed" });
    if (e instanceof PrismaClientKnownRequestError) {
      console.log(e)
    // res.status(500).json({ err, message: "Operation failed" });

    }
    res.status(500).json({ e, message: "Operation failed" })
  }
};

exports.updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString();
  }
  const { ...all } = req.body;
  console.log(all);
  try {
    const updatedUser = await prisma.user.update({
      where: {
        account_no: +req.params.account_no,
      },
      data: all,
    });
    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json({ err, message: "Operation failed" });
  }
};
