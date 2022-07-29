const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPass = '54321';
  const hash = '$2b$10$vQDJw5dj5UMnTPnZ.CBmfemC83taz2YS9TiRzrIGgMrtS5BSSfnjK'
  const isMatch = await bcrypt.compare(myPass, hash);
  console.log(isMatch);
}

verifyPassword();
