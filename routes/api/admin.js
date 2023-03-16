const {
    verifyToken,
    verifyTokenAndAuth,
    verifyAdmin
  } = require("../../controllers/verifyToken");
  const { updateUser, createUser, updateBal } = require("../../controllers/adminController");
  
  const router = require("express").Router();
  
//   router.route("/").get(getAllUsers);
  
  // router.route("/createUser").get(verifyAdmin, createUser);

  router.route("updateUser").put(verifyAdmin, updateUser)

  router.route("/update-bal").post(updateBal)
  
  module.exports = router;
  