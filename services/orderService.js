const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class OrderService {
  constructor () {}

  async create(data) {
    const newOrder = await models.Order.create(data)
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    return new Promise(async (resolve, reject) => {
      const order = await models.Order.findByPk(id, {
        include: [
          {
            association: 'customer',
            include: ['user']
          }
        ]
      });
      if (!order) {
        reject(boom.notFound('order not found'));
      }
      resolve(order)
    })
  }

  async update(id, changess) {
    return {id, changess};
  }

  async delete(id) {
    return id;
  }
}

module.exports = OrderService;
