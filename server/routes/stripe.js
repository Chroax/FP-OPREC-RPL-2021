const router = require("express").Router();
const { payment } = require("../controllers/stripe");

router.post("/payment", payment);

module.exports = router;
