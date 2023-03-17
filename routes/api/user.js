const {
    verifyToken,
    verifyTokenAndAuth,
  } = require("../../controllers/verifyToken");
  const { updateUser, getUser, getAllUsers, updateAdmin } = require("../../controllers/usersController");
  
  const router = require("express").Router();
  
  router.route("/").get(getAllUsers);
  
  router.route("/update-admin/:id").put(updateUser);
  router.route("/:id").get(verifyTokenAndAuth, getUser).put(verifyTokenAndAuth, updateUser);
  
  module.exports = router;
  