const user = require("./user");
const product = require("./product");
const initRouter = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/products", product);

  return (
    "/",
    (req, res) => {
      res.send("this route not defined!");
    }
  );
};

module.exports = initRouter;
