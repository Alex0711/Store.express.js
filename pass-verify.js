const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPass = 'admin124';
  const hash = '$2b$05$Vn4oVPM1cDL31IjXZfDume/TwiJD3H5iPmngX3j20k.2Ewsw7T2KG'
  const isMatch = await bcrypt.compare(myPass, hash);
  console.log(isMatch);
}

verifyPassword();
