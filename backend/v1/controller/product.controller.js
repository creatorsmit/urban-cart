const constants = require("../../config/constants");
const Product = require("../../models/product.model");
const { sendResponse } = require("../../services/common.services");

const getAllProduct = async (req, res, next) => {
  try {
    let { limit, page, sortBy, search } = req.query;

    if (limit) {
      limit = +limit || constants.LIMIT;
    }
    if (page) {
      page = +page || constants.PAGE;
    }

    let query = {};
    let field = "created_at",
      value = 1;
    if (sortBy) {
      const parts = sortBy.split(":");
      field = parts[0];
      parts[1] === "desc" ? (value = -1) : (value = 1);
    }
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { category: new RegExp(search, "i") },
        { seller: new RegExp(search, "i") },
      ];
    }
    const total = await Product.countDocuments(query);

    if (total === 0) {
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.OK,
        constants.STATUS_CODE.SUCCESS,
        "GENERAL.GET_LIST",
        { data: null, total, limit, page },
        req.headers.lang
      );
    }

    const product = await Product.find(query)
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ [field]: value });

    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.OK,
      constants.STATUS_CODE.SUCCESS,
      "GENERAL.GET_LIST",
      { data: product, total, limit: limit || null, page: page || null },
      req.headers.lang
    );
  } catch (err) {
    console.log("Error(getAllProduct)..", err);
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

const getByIdProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.BAD_REQUEST,
        constants.STATUS_CODE.NOT_FOUND,
        "GENERAL.NOT_FOUND",
        null,
        req.headers.lang
      );
    }
    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.OK,
      constants.STATUS_CODE.SUCCESS,
      "GENERAL.GET_LIST",
      product,
      req.headers.lang
    );
  } catch (err) {
    console.log("Error(getByIdProduct)..", err);
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

const addProduct = async (req, res, next) => {
  try {
    // data.map(async (data) => await Product.create(data));
    const product = await Product.create(req.body);

    return res.send({ message: "Product added successfully.", product });
  } catch (err) {
    console.log("Error(addProduct)..", err);
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
module.exports = { getAllProduct, addProduct, getByIdProduct };
