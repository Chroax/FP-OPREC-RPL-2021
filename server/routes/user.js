const user = require("../controllers/user");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../routes/verifyToken");
const router = require("express").Router();

router
  .route("/:id")
  .put(verifyTokenAndAuthorization, user.updateUser)
  .delete(verifyTokenAndAuthorization, user.deleteUser);

router.get("/find/:id", verifyTokenAndAdmin, user.findUser);

router.get("/", verifyTokenAndAdmin, user.getAllUser);

router.get("/stats", verifyTokenAndAdmin, user.getStatus);

module.exports = router;
