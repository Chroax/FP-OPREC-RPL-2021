const order = require("../controllers/order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router
  .route("/")
  .post(verifyToken, order.createOrder)
  .get(verifyTokenAndAdmin, order.getAllOrder);

router
  .route("/:id")
  .put(verifyTokenAndAdmin, order.updateOrder)
  .delete(verifyTokenAndAdmin, order.deleteOrder);

router.get("/find/:userId", verifyTokenAndAuthorization, order.findOrder);

router.get("/income", verifyTokenAndAdmin, order.getMonthlyIncome);

module.exports = router;
