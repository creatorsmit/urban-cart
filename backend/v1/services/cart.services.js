const Cart = require("../../models/cart.model");

const getCartDetails = async (query) => {
  return await Cart.aggregate([
    { $match: query },
    { $unwind: "$product" },
    {
      $lookup: {
        from: "products",
        localField: "product.product_id",
        foreignField: "_id",
        as: "productDetails",
        pipeline: [
          {
            $project: {
              name: 1,
              images: 1,
              description: 1,
              price: 1,
              stock: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$productDetails" },
    {
      $addFields: {
        "product.subtotal": {
          $multiply: ["$product.quantity", "$productDetails.price"],
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        cartItems: {
          $push: {
            quantity: "$product.quantity",
            config: "$productDetails",
            subtotal: "$product.subtotal",
          },
        },
      },
    },
    {
      $addFields: {
        subtotal: { $sum: "$cartItems.subtotal" },
      },
    },
    {
      $addFields: {
        tax: { $multiply: ["$subtotal", 0.18] },
      },
    },
  ]);
};

module.exports = getCartDetails;
