const Product = require("../model/product");
const data = require("../../data/dt.json");
const fn = async (product) => {
  await Product.create({
    title: product?.name,
    description: product?.description,
    brand: product?.brand,
    price: product?.price,

    image: product?.image,
    color: product?.color,
  });
};
const insertProduct = () =>
  new Promise(async (resolve, reject) => {
    try {
      const promises = [];

      for (let product of data["shoes"]) promises.push(fn(product));
      await Promise.all(promises);
      // const rs = await Product.create({
      //   title: data?.title,

      //   description: data?.description,
      //   price: data?.price,

      //   image: data?.image,
      //   color: data?.color,
      // });

      resolve({
        err: 0,
        mes: " thành công !",
      });
    } catch (error) {
      reject(error);
    }
  });
const createProduct = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await Product.create({
        title: data?.title,

        description: data?.description,
        price: data?.price,

        image: data?.image,
        color: data?.color,
      });

      resolve({
        err: rs ? 0 : 1,
        mes: rs ? "Tạo sản phẩm thành công !" : "Thất bại",
      });
    } catch (error) {}
  });

const getProductbyId = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await Product.findById(pid);

      resolve({
        err: rs ? 0 : 1,
        mes: rs ? "Lấy thành công !" : "Thất bại",
        product: rs,
      });
    } catch (error) {
      reject(error);
    }
  });
const updateProductbyId = (pid, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await Product.findByIdAndUpdate(
        pid,
        {
          title: data?.title,

          description: data?.description,
          price: data?.price,

          image: data?.image,
          color: data?.color,
        },
        { new: true }
      );

      resolve({
        err: rs ? 0 : 1,
        mes: rs ? "Update thành công !" : "Thất bại",
      });
    } catch (error) {
      reject(error);
    }
  });
const deleteProductbyId = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await Product.findByIdAndDelete(pid);

      resolve({
        err: rs ? 0 : 1,
        mes: rs ? "Xóa thành công !" : "Thất bại",
      });
    } catch (error) {
      reject(error);
    }
  });
const getProducts = ({ page, limit, ...data }) =>
  new Promise(async (resolve, reject) => {
    try {
      const pagesv = page || 1;
      const limitsv = limit || 10;
      const skip = (pagesv - 1) * limitsv;
      let q = {};
      let rs = Product.find(q);

      rs.skip(skip).limit(limitsv);

      rs.exec(async (err, response) => {
        if (err) throw new Error(err.message);
        const counts = await Product.find(q).countDocuments();
        resolve({
          success: response ? true : false,
          products: response ? response : "Cannot get products",
          counts,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
  createProduct,
  getProductbyId,
  updateProductbyId,
  deleteProductbyId,
  getProducts,
  insertProduct,
};
