const productService = require('./product.service');

const product1 = {
    "sku": 43268,
    "name": "loreal",
    "inventory": {
        "warehouses": [
            {
                "locality": "SP",
                "quantity": 12,
                "type": "ECOMMERCE"
            },
            {
                "locality": "MOEMA",
                "quantity": 3,
                "type": "PHYSICAL_STORE"
            }
        ]
    }
};

const product2 = {
    "sku": 43267,
    "name": "loreal",
    "inventory": {
        "warehouses": [
            {
                "locality": "SP",
                "quantity": 12,
                "type": "ECOMMERCE"
            },
            {
                "locality": "MOEMA",
                "quantity": 3,
                "type": "PHYSICAL_STORE"
            }
        ]
    }
};

const product3 = {
    "sku": 43268,
    "name": "acme",
    "inventory": {
        "warehouses": [
            {
                "locality": "SP",
                "quantity": 12,
                "type": "ECOMMERCE"
            },
            {
                "locality": "MOEMA",
                "quantity": 3,
                "type": "PHYSICAL_STORE"
            }
        ]
    }
};

beforeEach(() => {
    productService.dropDB();
  });

test('Should save 1 product', () => {
    const saveProduct = productService.saveProduct(product1);
    expect(saveProduct).toBe('File written successfully');
});

test('Should list all product', () => {
    productService.saveProduct(product1);
    productService.saveProduct(product2);
    const productList = productService.listProducts();
    expect(Object.keys(productList).length).toBe(2);
});

test('Should list one product by sku', () => {
    productService.saveProduct(product1);
    const product = productService.findProduct(43268);
    expect(product.sku).toBe(43268);
});

test('Should delete one product by sku', () => {
    productService.saveProduct(product1);
    const productSave = productService.findProduct(43268);
    expect(productSave.sku).toBe(43268);
    productService.deleteProduct(43268);
    const productDeleted = productService.findProduct(43268);
    expect(productDeleted).toBe('Product not found');
});

test('Should update one product name by sku', () => {
    productService.saveProduct(product1);
    const product = productService.findProduct(43268);
    expect(product.name).toBe('loreal');
    productService.updateProduct(product3,43268);
    const productUpdated = productService.findProduct(43268);
    expect(productUpdated.name).toBe('acme');

});