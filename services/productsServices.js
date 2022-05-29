const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = []; //ahora lo guardo acá, pero despues lo voy a guardar en una db
    this.generate(); //cuando se cree una instancia, se van a generar solos los productos
  }

  async generate() {
    const limit = 100;

    for (let index = 0; index < limit; index++) { //agrego los productos fake
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  async create(product) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...product
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    })
  }

  async findOne(id) {
    return new Promise((resolve, reject) => {
      const product = this.products.find(item => item.id === id);
      if (!product) {
        reject(boom.notFound('Product not found'));
      }
      if (product.isBlock) {
        reject(boom.conflict('Product is block'));
      }
      resolve (product);
    })
  }

  async update(id, changes) {
    const index = this.products.indexOf(this.products.find(item => item.id === id))
    if (index === -1){
      throw boom.notFound('Product not found')
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index]
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      const index = this.products.indexOf(this.products.find(item => item.id === id))
    if (index === -1){
      reject(boom.notFound('Product not found'))
    } else {
      resolve(this.products.splice(index, 1))
    }
    })
  }

}

module.exports = ProductsService
