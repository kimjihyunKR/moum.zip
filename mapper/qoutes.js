let qoutes = {
  selectAll : 'SELECT * FROM qoutes ORDER BY date DESC',
  selectByQouteId : 'SELECT * FROM qoutes WHERE qoute_id=? LIMIT 1',
  selectByUserid : 'SELECT * FROM qoutes where user_id=? ORDER BY date  DESC',
  selectKindOfBook : 'SELECT DISTINCT bookname FROM qoutes WHERE user_id=? ORDER BY bookname  ASC',
  selectByBookAndUser : 'select * from qoutes where bookname=? and user_id=?',

  insert : 'INSERT INTO qoutes (user_id, bookname, content, page) VALUES ((SELECT user_id FROM users WHERE user_id=?),?,?,?)',
  update : 'UPDATE qoutes SET bookname=?, content=?, page=? WHERE qoute_id=?',
  delete : 'DELETE FROM qoutes WHERE qoute_id=?',
}

module.exports = qoutes;