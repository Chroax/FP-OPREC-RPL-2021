const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return validator.isCurrency(v, {
            symbol: "$",
            require_symbol: true,
            allow_space_after_symbol: false,
            decimal_separator: ".",
            allow_decimal: true,
          });
        },
        message: (props) => `${props.value} is not a valid currency!`,
      },
    },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
