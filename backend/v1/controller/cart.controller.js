const constants = require('../../config/constants');
const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');
const { sendResponse } = require('../../services/common.services');
const { ObjectId } = require('mongodb');
const getCartDetails = require('../services/cart.services');

const getAllCart = async (req, res, next) => {
	try {
		let query = {};
		query.user_id = req.user._id;
		query.order_placed = false;

		const cart = await getCartDetails(query);

		if (cart.length === 0) {
			return sendResponse(
				res,
				constants.WEB_STATUS_CODE.OK,
				constants.STATUS_CODE.SUCCESS,
				'GENERAL.GET_LIST',
				{ data: null, total, limit, page },
				req.headers.lang
			);
		}

		return sendResponse(
			res,
			constants.WEB_STATUS_CODE.OK,
			constants.STATUS_CODE.SUCCESS,
			'GENERAL.GET_LIST',
			cart[0],
			req.headers.lang
		);
	} catch (err) {
		console.log('Error(getAllCart)..', err);
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

const getByIdCart = async (req, res, next) => {
	try {
		const id = req.params.id;
		const cart = await getCartDetails({
			_id: new ObjectId(id),
			order_placed: false,
		});

		if (cart.length === 0) {
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
			cart[0],
			req.headers.lang
		);
	} catch (err) {
		console.log('Error(getByIdCart)..', err);
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

const addCart = async (req, res, next) => {
	try {
		const product = await Product.findById(req.body.product_id);
		if (!product) {
			return sendResponse(
				res,
				constants.WEB_STATUS_CODE.BAD_REQUEST,
				constants.STATUS_CODE.NOT_FOUND,
				'PRODUCT.PRODUCT_NOT_FOUND',
				null,
				req.headers.lang
			);
		}
		const existingCart = await Cart.findOne({
			user_id: new ObjectId(req.user._id),
			order_placed: false,
		});
		if (existingCart) {
			// const deleteCart = await Cart.deleteOne(existingCart._id);
			const productIndex = await existingCart.product.findIndex(
				(p) => p.product_id.toString() === req.body.product_id
			);

			if (productIndex > -1) {
				//Product already exist
				existingCart.product[productIndex].quantity = req.body.quantity;
			} else {
				existingCart.product.push({
					product_id: req.body.product_id,
					quantity: req.body.quantity,
				});
			}
			await existingCart.save();
			return sendResponse(
				res,
				constants.WEB_STATUS_CODE.OK,
				constants.STATUS_CODE.SUCCESS,
				'PRODUCT.PRODUCT_ADD',
				existingCart,
				req.headers.lang
			);
		} else {
			const cart = await Cart.create({
				product: [
					{
						product_id: req.body.product_id,
						quantity: req.body.quantity,
					},
				],
				user_id: req.user._id,
			});

			return sendResponse(
				res,
				constants.WEB_STATUS_CODE.OK,
				constants.STATUS_CODE.SUCCESS,
				'PRODUCT.PRODUCT_ADD',
				cart,
				req.headers.lang
			);
		}
	} catch (err) {
		console.log('Error(addCart)..', err);
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

const removeCartProduct = async (req, res, next) => {
	try {
		const cart = await Cart.findOne({
			user_id: new ObjectId(req.user._id),
			order_placed: false,
		});
		if (!cart) {
			return sendResponse(
				res,
				constants.WEB_STATUS_CODE.BAD_REQUEST,
				constants.STATUS_CODE.NOT_FOUND,
				'CART.CART_NOT_FOUND',
				null,
				req.headers.lang
			);
		}

		cart.product = cart.product.filter(
			(p) => p.product_id.toString() !== req.params.id
		);
		await cart.save();

		return sendResponse(
			res,
			constants.WEB_STATUS_CODE.OK,
			constants.STATUS_CODE.SUCCESS,
			'PRODUCT.PRODUCT_REMOVE',
			cart,
			req.headers.lang
		);
	} catch (err) {
		console.log('Error(removeCartProduct)..', err);
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
module.exports = { getAllCart, addCart, getByIdCart, removeCartProduct };
