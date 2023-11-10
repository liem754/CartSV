const { default: mongoose } = require("mongoose");
const cnmgdb = async () => {
  try {
    mongoose.set("strictQuery", true);
    const con = await mongoose.connect(process.env.MONGOODB_URL);
    if (con.connection.readyState === 1) {
      console.log("Connect db is success !!");
    } else {
      console.log("Connect db is failed");
    }
  } catch (error) {
    console.log("Connect db is failed");
    throw new Error(error);
  }
};
module.exports = cnmgdb;
