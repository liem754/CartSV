// export const isAdmin = (req, res, next) => {
//   const { role } = req.user;
//   console.log(req.user);
//   if (role !== "R1") {
//     return res.status(401).json({ mes: "Yêu cầu quyền Admin" });
//   }
//   next();
// };
const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (+role !== 2002) {
    return res.status(402).json({ mes: "Yêu cầu quyền Admin !" });
  }

  next();
};

module.exports = { isAdmin };
