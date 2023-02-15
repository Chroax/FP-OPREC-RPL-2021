const cart = require("../controllers/cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router
  .route("/")
  .post(verifyToken, cart.createCart)
  .get(verifyTokenAndAdmin, cart.getAllCart);

router
  .route("/:id")
  .put(verifyTokenAndAuthorization, cart.updatedCart)
  .delete(verifyTokenAndAuthorization, cart.deleteCart);

router.get("/find/:userId", verifyTokenAndAuthorization, cart.findCart);

module.exports = router;
