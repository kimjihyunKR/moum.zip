let quotes = {
  selectAll : 'SELECT * FROM quotes ORDER BY date DESC',
  selectByQuoteId : 'SELECT * FROM quotes WHERE quote_id=? LIMIT 1',
  selectByUserid : 'SELECT * FROM quotes where user_id=? ORDER BY date  DESC',
  selectKindOfBook : 'SELECT DISTINCT bookname FROM quotes WHERE user_id=? ORDER BY bookname  ASC',
  selectByBookAndUser : 'select * from quotes where bookname=? and user_id=?',

  insert : 'INSERT INTO quotes (user_id, bookname, content, page) VALUES ((SELECT user_id FROM users WHERE user_id=?),?,?,?)',
  update : 'UPDATE quotes SET bookname=?, content=?, page=? WHERE quote_id=?',
  delete : 'DELETE FROM quotes WHERE quote_id=?',
}

module.exports = quotes;