const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const UserService = require('../services/usersService');
const service = new UserService

class OrderService {
  constructor () {}

  async create(userId) {
    const user = await service.findOne(userId);
    const customerId = user.dataValues.customer.dataValues.id;
    const newOrder = await models.Order.create({customerId})
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data)
    return newItem;
  }
//Hecho aantes de ver la clase. Ver findByUser()
  async find(user) {
    const orders = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if (user.role === "admin") {
      return orders;
    } else {
      const userOrder = []
      for (const order of orders) {
        if (order.dataValues.customer.dataValues.user.dataValues.id === user.sub) {
          userOrder.push(order)
        }
      }
      return userOrder
    }
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    })
    return orders;
  }

  async findOne(id) {
    return new Promise(async (resolve, reject) => {
      const order = await models.Order.findByPk(id, {
        include: [
          {
            association: 'customer',
            include: ['user']
          },
          'items'
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
