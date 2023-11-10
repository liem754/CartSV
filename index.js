const express = require("express");
const cors = require("cors");
const cnmgdb = require("./src/config/connectdb");
const initRouter = require("./src/routes");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.URL_CLIENT,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
cnmgdb();
initRouter(app);
const port = process.env.PORT || 8888;

const listener = app.listen(port, () => {
  console.log(`Sv on the port ${listener.address().port}`);
});
