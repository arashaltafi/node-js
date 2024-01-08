const bcrypt = require('bcrypt');

const saltRounds = 10;
const password = 'arash';

const hashedPassword = bcrypt.hashSync(password, saltRounds);
console.log("hashedPassword", hashedPassword);

const isMatch = bcrypt.compareSync(password, hashedPassword);
console.log("isMatch", isMatch);