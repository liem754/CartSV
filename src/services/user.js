const User = require("../model/user");
const jwt = require("jsonwebtoken");
const register = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const kt = await User.findOne({ email: data.email });

      if (kt) {
        resolve({
          err: -1,
          mes: "Email đã được sử dụng !",
        });
      } else {
        const rs = await User.create({
          name: data.name,
          mobile: data.mobile,
          email: data.email,
          password: data.password,
        });
        resolve({
          err: rs ? 0 : 1,
          mes: rs ? "nice!" : "failed!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
const login = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const kt = await User.findOne({ email: data.email });
      if (kt && (await kt.isCorrectPassword(data.password))) {
        const accessToken = jwt.sign(
          { id: kt._id, role: kt.role, email: kt.email },
          process.env.JWT,
          { expiresIn: "2d" }
        );
        //Tách password và role ra từ response
        // const { password, role, refreshToken, ...userData } = kt.toObject();
        // //Tạo accessToken
        // const accessToken = generateAccessToken(response._id, role);
        // //Tạo refreshToken
        // const newrefreshToken = generateRefreshToken(response._id);
        // //Đẩy refreshToken vô database
        // await User.findByIdAndUpdate(
        //   response._id,
        //   { newrefreshToken },
        //   { new: true }
        // );
        // //Lưu refreshToken vào cookie
        // res.cookie("refreshToken", newrefreshToken, {
        //   httpOnly: true,
        //   maxAge: 7 * 24 * 60 * 60 * 1000,
        // });
        resolve({
          success: true,
          accessToken: accessToken ? `Bearer ${accessToken}` : accessToken,
          userData: kt,
          mes: "Login success!",
        });
      } else {
        throw new Error("Invalid credentials!");
      }
    } catch (error) {
      reject(error);
    }
  });

const updateCart = (data, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const cartUser = await User.findById(id);
      const alreadyCart = cartUser?.cart.find(
        (el) => el.product.toString() === data?.pid
      );
      if (alreadyCart) {
        const response = await User.updateOne(
          { cart: { $elemMatch: alreadyCart } },
          {
            $set: {
              "cart.$.quantity": data?.quantity,
              "cart.$.price": data?.price,
            },
          },
          { new: true }
        );
        resolve({
          err: response ? 0 : 1,
          mes: response
            ? "Cập Nhập Giỏ Hàng Thành Công!"
            : "Some thing went wrong!",
        });
      } else {
        const response = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              cart: {
                product: data?.pid,
                quantity: data?.quantity,
                price: data?.price,
                title: data?.title,
                thumb: data?.thumb,
                color: data?.color,
              },
            },
          },
          { new: true }
        );
        resolve({
          err: response ? 0 : 1,
          mes: response ? "Đã Thêm Vào Giỏ Hàng!" : "Some thing went wrong!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
const getCarts = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await User.findById(id).select("cart");

      resolve({
        err: response ? 0 : 1,
        mes: response ? "Thành công !" : "Some thing went wrong!",
        carts: response,
      });
    } catch (error) {
      reject(error);
    }
  });
const deleteCarts = (_id, pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await User.findById(_id).select("cart");
      const alreadyCart = rs.cart.find((el) => el.product.toString() === pid);
      if (alreadyCart) {
        const response = await User.findByIdAndUpdate(
          _id,
          { $pull: { cart: { product: pid } } },
          { new: true }
        );
        resolve({
          success: response ? true : false,
          mes: response
            ? "Đã Xóa Sản Phẩm Khỏi Giỏ Hàng!"
            : "Some thing went wrong!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
  register,
  login,
  updateCart,
  getCarts,
  deleteCarts,
};
