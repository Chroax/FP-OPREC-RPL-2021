const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: {
      type: String,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
