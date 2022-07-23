const boom = require('@hapi/boom');
// const getConnection = require('../libs/postgres') No lo necesito porque voy a trabajar con sequelize
const { models } = require('./../libs/sequelize')
//sequelize guarda todos los modelos en models. y el nombre del modelo
const bcrypt = require('bcrypt');

class UsersService {
  constructor () {}

  async create(data) {
    const userHash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: userHash,
    });
    delete newUser.dataValues.password
    return newUser;
  }

  async find() {
    // const client = await getConnection();
    // const res = await client.query('SELECT * FROM task');
    // return res.rows;
    const res = await models.User.findAll({
      include: ['customer']
    });
    return res;
  }

  async findOne(id) {
    // return this.users.find(user => user.id === id)
    const user = await models.User.findByPk(Number(id));
    if (!user) {
      throw boom.notFound('User not found');
    };
    return user;
  }

  async update(id, changess) {
    const user = await this.findOne(id);
    const rta = await user.update(changess);
    return rta;
  }

  async delete(id) {
    // return new Promise((resolve, reject) => {
    //   const index = this.users.indexOf(this.users.find(item => item.id === id))
    //   if (index === -1){
    //     reject(new Error('User Not Found'))
    //   } else {
    //     this.users.splice(index, 1)
    //     resolve(id)
    //   }
    // })
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UsersService;
