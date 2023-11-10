const express = require("express");
const {
  registerCT,
  loginCT,
  updateCartCT,
  getCartCT,
  deleteCartCT,
} = require("../controller/user");
const { verifyToken } = require("../middlewares/verify_token");

const route = express.Router();

route.post("/register", registerCT);
route.post("/login", loginCT);
route.put("/update", verifyToken, updateCartCT);
route.get("/", verifyToken, getCartCT);
route.delete("/delete/:pid", verifyToken, deleteCartCT);

module.exports = route;
