const mongoose = require("mongoose");
const Product = require("../models/product.model");
const products = require("./data");

const fs = require("fs");
const path = require("path");

const readJSONFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    });
  });
};

const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/unity-stack-solutions");
    await Product.deleteMany();
    console.log("Products are deleted");

    const data = await readJSONFile(path.join(__dirname, "../../a.json"));

    await Product.insertMany(data);
    console.log("All products are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
