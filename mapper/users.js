let users = {
  selectByUserid : 'SELECT user_id FROM users WHERE user_id=?',
  selectByUseridAndPw : 'SELECT * FROM users WHERE user_id=? AND password=?',
  insert : 'INSERT INTO users (user_id, password, name, nickname) VALUES (?,?,?,?);',
  updatePassword : 'UPDATE users SET password=? WHERE user_id=?',
  delete : 'DELETE FROM users WHERE user_id=?',
}

module.exports = users;