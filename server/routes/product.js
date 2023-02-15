const { verifyTokenAndAdmin } = require("./verifyToken");
const product = require("../controllers/product");
const router = require("express").Router();

router
  .route("/")
  .post(verifyTokenAndAdmin, product.createProduct)
  .get(product.getAllProducts);

router
  .route("/:id")
  .put(verifyTokenAndAdmin, product.updateProduct)
  .delete(verifyTokenAndAdmin, product.deleteProduct);

router.get("/find/:id", product.findProduct);

module.exports = router;
