const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

const { config } = require('../config/config');
const UserService = require('./usersService');

const service = new UserService();

class AuthService {
  constructor () {}

  async getUser(email, password) {
    const user = await service.findByEmail(email);
      if (!user) {
        throw boom.unauthorized();
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw boom.unauthorized();
      }
      delete user.dataValues.password
    return user;
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return token
  }

  async sendToken(email){
    const user = await service.findByEmail(email);
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'})
    await service.update(user.id, {recoveryToken: token})
    const mail = {
      from: `"Alejandro :)" <${config.emailUser}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Recovery Password ✔", // Subject line
      // text: `Hello world!`, // plain text body
      html: `<b>Dale click al link => www.my_frontend.com/recovery?token=${token}</b>`, // html body
    }
    const rta = await this.sendMail(mail)
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token){
        throw boom.unauthorized();
      }
      const Hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {password: Hash, recoveryToken: null})
      return { message: 'Password changed' };
    } catch (error) {
      boom.unauthorized();
    }
  }

  async sendMail(mail){
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.emailUser, // generated ethereal user
        pass: config.emailPass, // generated ethereal password
      },
    });

    await transporter.sendMail(mail);

    return { message: 'mail sent'};
  }

}

module.exports = AuthService;
