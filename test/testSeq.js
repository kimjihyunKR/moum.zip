const User = require('../models/user');
const Comment = require('../models/Wording');

const { sequelize } = require('../models');

sequelize.sync()
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

// try {
//   const users = User.findAll();
//   console.log(users);
// } catch (err) {
//   console.error(err);
//   next(err);
// }