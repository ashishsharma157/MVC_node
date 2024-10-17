const fs = require("fs");
const path = require("path");

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    (this.imageUrl = imageUrl), (this.description = description);
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductFromFile((product) => {
      product.push(this);
      fs.writeFile(p, JSON.stringify(product), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }
  static findById(id, cb){
    getProductFromFile(products=>{
      const product=products.find(p=> p.id===id);
      cb(product);
    })
  }
};
