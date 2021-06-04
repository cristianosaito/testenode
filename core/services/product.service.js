/* eslint-disable eqeqeq */
/* eslint-disable no-throw-literal */
/* eslint-disable no-plusplus */
const fs = require('fs');

const dataPath = `${__dirname}/product.json`;

const listProducts = () => {
  try {
    const resp = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return resp;
  } catch (err) {
    return err;
  }
};

const calculateQuantity = (product) => {
  const { warehouses } = product.inventory;
  let quantity = 0;
  for (let i = 0; i < warehouses.length; i++) {
    quantity += warehouses[i].quantity;
  }
  return quantity;
};

const findProduct = (needle) => {
  let found = false;
  try {
    const json = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    let product;
    for (let i = 0; i < json.length; i++) {
      if (json[i] != null && json[i].sku == needle) {
        product = json[i];
        found = true;
      }
    }
    if (found) {
      const quantity = calculateQuantity(product);
      product.inventory.quantity = quantity;
      if (quantity > 0) {
        product.isMarketable = true;
      }
      return product;
    }
    return 'Product not found';
  } catch (err) {
    return err;
  }
};

const saveProduct = (body) => {
  const skuNeedle = body.sku;
  try {
    const json = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    for (let i = 0; i < json.length; i++) {
      if (json[i] != null && json[i].sku == skuNeedle) {
        throw 'Product already exists';
      }
    }
    json.push(body);
    try {
      fs.writeFileSync(dataPath, JSON.stringify(json));
      return 'File written successfully';
    } catch (err) {
      return err;
    }
  } catch (err) {
    return err;
  }
};

const deleteProduct = (needle) => {
  let found = false;
  try {
    const json = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    for (let i = 0; i < json.length; i++) {
      if (json[i] != null && json[i].sku == needle) {
        delete json[i];
        found = true;
      }
    }
    const producList = json.filter((product) => product != null);
    if (found) {
      try {
        fs.writeFileSync(dataPath, JSON.stringify(producList));
        return true;
      } catch (err) {
        return err;
      }
    } else {
      return 'Product not found';
    }
  } catch (err) {
    return err;
  }
};

const updateProduct = (body, needle) => {
  try {
    const productDelete = deleteProduct(needle);
    if (productDelete === 'Product not found') {
      return 'Product not found!';
    }
    saveProduct(body);
    return 'Product updated succesfuly!';
  } catch (err) {
    return err;
  }
};

const dropDB = () => {
  fs.writeFileSync(dataPath, '[]');
};

module.exports = {
  listProducts,
  saveProduct,
  deleteProduct,
  updateProduct,
  findProduct,
  dropDB,
};
