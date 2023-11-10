const express = require("express");
const { registerCT, loginCT } = require("../controller/user");
const { verifyToken } = require("../middlewares/verify_token");
const {
  createdProductCT,
  getProductCT,
  updateProductCT,
  deleteProductCT,
  insertProductCT,
  getProductCTs,
} = require("../controller/product");
const { isAdmin } = require("../middlewares/verify_IsAdmin");

const route = express.Router();

route.post("/insert", insertProductCT);

route.post("/", verifyToken, isAdmin, createdProductCT);
route.put("/:pid", (verifyToken, isAdmin), updateProductCT);
route.delete("/:pid", (verifyToken, isAdmin), deleteProductCT);

route.get("/:pid", getProductCT);
route.get("/", getProductCTs);

module.exports = route;
