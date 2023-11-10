const {
  createProduct,
  getProductbyId,
  updateProductbyId,
  deleteProductbyId,
  insertProduct,
  getProducts,
} = require("../services/product");

const createdProductCT = async (req, res) => {
  const {
    title,

    description,

    price,

    image,
    color,
  } = req.body;
  try {
    if (!title || !description || !price || !image || !color)
      return res.status(401).json({
        err: -1,
        mes: "Missing input!",
      });

    const rs = await createProduct(req.body);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Server err" + error,
    });
  }
};
const getProductCT = async (req, res) => {
  const { pid } = req.params;
  try {
    if (!pid)
      return res.status(401).json({
        err: -1,
        mes: "Missing input!",
      });

    const rs = await getProductbyId(pid);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Server err" + error,
    });
  }
};
const deleteProductCT = async (req, res) => {
  const { pid } = req.params;
  try {
    if (!pid)
      return res.status(401).json({
        err: -1,
        mes: "Missing input!",
      });

    const rs = await deleteProductbyId(pid);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Server err" + error,
    });
  }
};
const updateProductCT = async (req, res) => {
  const { pid } = req.params;
  const {
    title,

    description,

    price,

    image,
    color,
  } = req.body;
  try {
    if (!pid || !title || !description || !price || !image || !color)
      return res.status(401).json({
        err: -1,
        mes: "Missing input!",
      });

    const rs = await updateProductbyId(pid, req.body);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Server err" + error,
    });
  }
};
const insertProductCT = async (req, res) => {
  try {
    const rs = await insertProduct();
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Server err" + error,
    });
  }
};
const getProductCTs = async (req, res) => {
  try {
    const rs = await getProducts(req.query);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Server err" + error,
    });
  }
};
module.exports = {
  createdProductCT,
  getProductCT,
  updateProductCT,
  deleteProductCT,
  insertProductCT,
  getProductCTs,
};
