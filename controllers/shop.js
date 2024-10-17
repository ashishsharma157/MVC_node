const Product = require("../models/product");
const Cart=require('../models/cart');
const path = require("../util/path");
exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your cart",
  });
};
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your orders",
  });
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Your checkout",
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path:'/products'
    });
  });
};

exports.postCart=(req, res, next)=>{
  const prodId=req.body.prodId;
  Product.findById(prodId, (product)=>{
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
}