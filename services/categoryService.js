const { models } = require('./../libs/sequelize')

class CategoryService {
  constructor () {}

  async create(data) {
    return data;
  }

  async find() {
    return []
  }

  async findOne(id) {
    return id;
  }

  async update(id, changess) {
    return {id, changess};
  }

  async delete(id) {
    return id;
  }
}

module.exports = CategoryService;
