const Order = require('../../models/order.model');
const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');
const { sendResponse } = require('../../services/common.services');
const { ObjectId } = require('mongodb');
const constants = require('../../config/constants');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const keys = require('../../keys/keys');
const User = require('../../models/user.model');

const createOrder = async (req, res, next) => {
	try {
		const existingCart = await Cart.findOne({
			_id: new ObjectId(req.body.cart_id),
		});
		if (!existingCart) {
			return sendResponse(
				res,
				constants.WEB_STATUS_CODE.BAD_REQUEST,
				constants.STATUS_CODE.NOT_FOUND,
				'CART.CART_NOT_FOUND',
				null,
				req.headers.lang
			);
		}
		if (existingCart.order_placed) {
			return sendResponse(
				res,
				constants.WEB_STATUS_CODE.BAD_REQUEST,
				constants.STATUS_CODE.FAIL,
				'CART.ORDER_PLACED',
				null,
				req.headers.lang
			);
		}

		for (i = 0; i < existingCart.product.length; i++) {
			const product = await Product.findById(
				existingCart.product[i].product_id
			);
			if (product.stock < existingCart.product[i].quantity) {
				return res.status(constants.WEB_STATUS_CODE.BAD_REQUEST).send({
					status: constants.STATUS_CODE.FAIL,
					message: `${product.name} is out of stock. Please try again.`,
					data: null,
				});
			}
		}
		const razorpay = new Razorpay({
			key_id: keys.RZP_KEY_ID,
			key_secret: keys.RZP_KEY_SECRET,
		});

		const order = await razorpay.orders.create({
			amount: +req.body.amount * 100,
			currency: 'INR',
			receipt: 'order_id',
		});
		console.log('order ', order, typeof order);

		const user = await User.findByIdAndUpdate(
			{
				_id: new ObjectId(req.user._id),
			},
			{
				shipping_address: req.body.shipping_address,
				billing_address: req.body.billing_address,
				contact: req.body.contact,
			}
		);

		const ord = await Order.create({
			cart_id: req.body.cart_id,
			user_id: req.user._id,
			order_id: order.id,
			order_status: order.status,
			order_date: Date.now(),
			amount: req.body.amount,
		});

		return sendResponse(
			res,
			constants.WEB_STATUS_CODE.OK,
			constants.STATUS_CODE.SUCCESS,
			'CART.ORDER_CREATED',
			ord,
			req.headers.lang
		);
	} catch (err) {
		console.log('Error(createOrder)..', err);
		return sendResponse(
			res,
			constants.WEB_STATUS_CODE.SERVER_ERROR,
			constants.STATUS_CODE.FAIL,
			'GENERAL.GENERAL_ERROR_CONTENT',
			{ message: err.message },
			req.headers.lang
		);
	}
};

const varifyOrder = async (req, res, next) => {
  try {
    const { payment_id, order_id, signature, isFail } = req.body;

    let order = await Order.findOne({ order_id, is_cancel: false });
    if (isFail) {
      if (order) {
        order.is_cancel = true;
        order.order_status = "Fail";
      }
      await order.save();
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.OK,
        constants.STATUS_CODE.SUCCESS,
        "CART.ORDER_FAIL",
        order,
        req.headers.lang
      );
    } else {
      const sha = crypto.createHmac("sha256", keys.RZP_KEY_SECRET);
      sha.update(order_id + "|" + payment_id);
      const digest = sha.digest("hex");
      if (digest !== signature) {
        return sendResponse(
          res,
          constants.WEB_STATUS_CODE.BAD_REQUEST,
          constants.STATUS_CODE.FAIL,
          "CART.SIGN_INVALID",
          null,
          req.headers.lang
        );
      }

      const existingCart = await Cart.findOne({
        _id: new ObjectId(order?.cart_id),
      });
      if (existingCart) {
        existingCart.order_placed = true;
        for (i = 0; i < existingCart.product.length; i++) {
          const product = await Product.findById(
            existingCart.product[i].product_id
          );
          product.stock -= existingCart.product[i].quantity;
          //   if (product.stock < existingCart.product[i].quantity) {
          //     return res.status(constants.WEB_STATUS_CODE.BAD_REQUEST).send({
          //       status: constants.STATUS_CODE.FAIL,
          //       message: ⁠ ${product.name} is out of stock. Please try again. ⁠,
          //       data: null,
          //     });
          //   }
          await existingCart.save();
        }
      }

      order = await Order.findOne({ order_id, is_cancel: false });
      if (order) {
        order.order_status = "Success";
        order.pay_id = payment_id;
        order.order_date = Date.now();
      }
      await order.save();
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.OK,
        constants.STATUS_CODE.SUCCESS,
        "CART.ORDER_PLACED",
        order,
        req.headers.lang
      );
    }
  } catch (err) {
    console.log("Error(varifyOrder)..", err);
    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.SERVER_ERROR,
      constants.STATUS_CODE.FAIL,
      "GENERAL.GENERAL_ERROR_CONTENT",
      { message: err.message },
      req.headers.lang
    );
  }
};

const getOrderDetails = async (req, res, next) => {
	try {
		let order = await Order.aggregate([
			{ $match: { user_id: new ObjectId(req.user._id) } },
			{
				$lookup: {
					from: 'carts',
					localField: 'cart_id',
					foreignField: '_id',
					as: 'cart',
					pipeline: [
						{ $unwind: '$product' },
						{
							$lookup: {
								from: 'products',
								localField: 'product.product_id',
								foreignField: '_id',
								as: 'productDetails',
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
						{ $unwind: '$productDetails' },
						// {
						//   $addFields: {
						//     "product.subtotal": {
						//       $multiply: ["$product.quantity", "$productDetails.price"],
						//     },
						//   },
						// },
						{
							$group: {
								_id: '$_id',
								cartItems: {
									$push: {
										quantity: '$product.quantity',
										config: '$productDetails',
										subtotal: '$product.subtotal',
									},
								},
							},
						},
					],
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'user_id',
					foreignField: '_id',
					as: 'user',
					pipeline: [
						{
							$project: {
								shipping_address: 1,
								contact: 1,
								billing_address: 1,
								email: 1,
							},
						},
					],
				},
			},
			{ $unwind: '$cart' },
			{ $unwind: '$user' },
		]);

		if (order.length === 0) {
			return sendResponse(
				res,
				constants.WEB_STATUS_CODE.BAD_REQUEST,
				constants.STATUS_CODE.NOT_FOUND,
				'GENERAL.NOT_FOUND',
				null,
				req.headers.lang
			);
		}

		return sendResponse(
			res,
			constants.WEB_STATUS_CODE.OK,
			constants.STATUS_CODE.SUCCESS,
			'GENERAL.GET_LIST',
			order,
			req.headers.lang
		);
	} catch (err) {
		console.log('Error(getOrderDetails)..', err);
		return sendResponse(
			res,
			constants.WEB_STATUS_CODE.SERVER_ERROR,
			constants.STATUS_CODE.FAIL,
			'GENERAL.GENERAL_ERROR_CONTENT',
			{ message: err.message },
			req.headers.lang
		);
	}
};
module.exports = { createOrder, varifyOrder, getOrderDetails };
