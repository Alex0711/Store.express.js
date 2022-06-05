const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize')


class CustomersService {
  constructor () {}

  async create(data) {
    // const newUser = await models.User.create(data.user);
    // const newCustomer = await models.Customer.create({
    //   ...data,
    //   userId: newUser.id
    // })
    // return newCustomer;
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;

  }

  async find() {
    const res = await models.Customer.findAll({
      include: ['user']
    });
    return res;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(Number(id));
    if (!customer) {
      throw boom.notFound('Customer not found');
    };
    return customer;
  }

  async update(id, changess) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changess);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomersService;
