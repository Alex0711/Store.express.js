const bcrypt = require('bcrypt');

async function hashPassword() {
  const myPass = 'admin123';
  const hash = await bcrypt.hash(myPass, 5);
  console.log(hash);
}

hashPassword();
