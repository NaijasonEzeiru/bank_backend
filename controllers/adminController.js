const PrismaClient = require("@prisma/client").PrismaClient;
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
   try {
    const user = await prisma.user.findMany();
    // Filterm password_hash
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err, message: "User not found" });
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
exports.updateBal = async (req, res) => {
  let {account_no, amount, currency } = req.body;
  console.log("🚀 ~ file: adminController.js:52 ~ exports.updateBal= ~ account_no, amount:", account_no, amount, currency)
 account_no = +account_no -1002784563
  try {
    const updatedUser = await prisma.user.update({
      where: {
        // account_no: +req.params.account_no,
        account_no:  +account_no,
      },
      data: {
        account_bal: {
            increment: +amount,
        currency: currency.toString()

        }
        
      }
    });
    console.log(updatedUser)
    res.status(201).json(updatedUser);
  } catch (err) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.log(e)
    // res.status(500).json({ err, message: "Operation failed" });gi

    }
    res.status(500).json({ err, message: "Operation failed" });
  }
};
