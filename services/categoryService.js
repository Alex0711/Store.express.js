const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class CategoryService {
  constructor () {}

  async create(data) {
    const newCategory = await models.Category.create(data)
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    return new Promise(async (resolve, reject) => {
      const category = await models.Category.findByPk(id, {
        include: ['products']
      });
      if (!category) {
        reject(boom.notFound('Category not found'));
      }
      resolve(category)
    })
  }

  async update(id, changess) {
    return {id, changess};
  }

  async delete(id) {
    return id;
  }
}

module.exports = CategoryService;
