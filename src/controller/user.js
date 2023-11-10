const {
  register,
  login,
  updateCart,
  getCarts,
  deleteCarts,
} = require("../services/user");

const registerCT = async (req, res) => {
  const { name, mobile, email, password } = req.body;
  try {
    if (!name || !password || !email || !mobile)
      return res.status(401).json({
        err: -1,
        mes: "missing input!",
      });

    const rs = await register(req.body);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "sv error" + error,
    });
  }
};
const loginCT = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!password || !email)
      return res.status(401).json({
        err: -1,
        mes: "missing input!",
      });

    const rs = await login(req.body);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "sv error" + error,
    });
  }
};
const updateCartCT = async (req, res) => {
  const { pid, quantity, price, title, thumb, color } = req.body;
  const { id } = req.user;

  try {
    if (!pid || !quantity || !price || !title || !thumb)
      return res.status(401).json({
        err: -1,
        mes: "missing input!",
      });

    const rs = await updateCart(req.body, id);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "sv error" + error,
    });
  }
};
const getCartCT = async (req, res) => {
  const { id } = req.user;
  try {
    const rs = await getCarts(id);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "sv error" + error,
    });
  }
};
const deleteCartCT = async (req, res) => {
  const { id } = req.user;
  const { pid } = req.params;
  try {
    const rs = await deleteCarts(id, pid);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "sv error" + error,
    });
  }
};
module.exports = {
  registerCT,
  loginCT,
  updateCartCT,
  getCartCT,
  deleteCartCT,
};
