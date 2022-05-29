const faker = require('faker');

class UsersService {

  constructor () {
    this.users = [];
    this.generate();
  }

  generate() {
    for (let index = 0; index < 50; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress() + faker.address.city() + faker.address.country(),
      })
    }
  }

  create(user) {
    this.users.push(user)
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users)
      }, 1000);
    })
  }

  findOne(id) {
    return this.users.find(user => user.id === id)
  }

  update(id, user) {
    const index = this.users.indexOf(this.users.find(item => item.id === id))
    if (index === -1){
      return false;
    } else {
      this.users.splice(index, 1, user)
      return true
    }
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const index = this.users.indexOf(this.users.find(item => item.id === id))
      if (index === -1){
        reject(new Error('User Not Found'))
      } else {
        this.users.splice(index, 1)
        resolve(id)
      }
    })
  }
}

module.exports = UsersService;
