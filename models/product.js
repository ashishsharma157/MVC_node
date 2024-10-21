const fs = require("fs");
const path = require("path");
const Cart=require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.log(err);
      cb([]);
    } else {
      if (fileContent.length === 0) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    }
  });
};
const products = [];
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    (this.imageUrl = imageUrl), (this.description = description);
    this.price = price;
  }

  save() {
    getProductFromFile((product) => {
      if (this.id) {
        const existingProductIndex = product.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...product];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        product.push(this);
        fs.writeFile(p, JSON.stringify(product), (err) => {
          console.log(err);
        });
      }
    });
  }

  static delete(id) {
    getProductFromFile((products) => {
      const product=products.find(prod=>prod.id===id);
      const remainProduct = products.filter((prod) => prod.id !== id);
      console.log(remainProduct);
      fs.writeFile(p, JSON.stringify(remainProduct), (err) => {
        if(!err){
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }
  static findById(id, cb) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
