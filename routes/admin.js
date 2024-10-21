const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", adminController.addNewProduct);
router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product/", adminController.postEditProduct);
router.post("/delete-product/", adminController.deleteProduct);
router.get("/products", adminController.getProducts);

//exports.routes = router;
//exports.products = products;
module.exports = router;
