const productService = require('../services/product.service');

const productDTO = {
  sku: 0,
  name: '',
  inventory: {
    quantity: 0,
    warehouses: [
      {
        locality: '',
        quantity: 0,
        type: '',
      },
      {
        locality: '',
        quantity: 0,
        type: '',
      },
    ],
  },
  isMarketable: false,
};

const createProduct = async (req, res) => {
  const { body } = req;
  productDTO.sku = body.sku;
  productDTO.name = body.name;
  productDTO.inventory.warehouses = body.inventory.warehouses;

  try {
    const resp = await productService.saveProduct(productDTO);
    res.status(201).send(resp);
  } catch (err) {
    res.status(500).json(err);
  }
};

const findProductBySku = async (req, res) => {
  const { sku } = req.params;
  try {
    const resp = await productService.findProduct(sku);
    res.status(200).json(resp);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  const { sku } = req.params;
  const { body } = req;
  productDTO.sku = sku;
  productDTO.name = body.name;
  productDTO.inventory.warehouses = body.inventory.warehouses;
  try {
    const resp = await productService.updateProduct(productDTO, sku);
    res.status(200).send(resp);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteProduct = async (req, res) => {
  const { sku } = req.params;
  try {
    const resp = await productService.deleteProduct(sku);
    if (resp === true) {
      res.status(204).send('Product deleted successfuly!');
    } else {
      res.status(404).send('Product not found!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const listProducts = async (req, res) => {
  try {
    const resp = await productService.listProducts();
    res.status(200).json(resp);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createProduct,
  findProductBySku,
  updateProduct,
  deleteProduct,
  listProducts,
};
