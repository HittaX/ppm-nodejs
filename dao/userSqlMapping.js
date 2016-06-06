var user = {
    insert:'INSERT INTO users(email,password,status,salt) VALUES(?,?,0,?)',
    exist: 'SELECT ',
    selectByEmail:'SELECT * FROM users where email = ?',
    insertSite: 'INSERT INTO logins(user_email,website,sitename,username,password_aes,labels,notes) VALUES(?,?,?,?,?,?,?)',
    selectSite: 'SELECT * FROM logins where user_email = ?',
    insertBankcard: 'INSERT INTO bankcards(user_email,type,card_number,bands,valid_from,expiry_date,labels,notes) VALUES(?,?,?,?,?,?,?,?)',
    selectBankcard: 'SELECT * FROM bankcards where user_email = ?',
    insertServer: 'INSERT INTO servers(user_email,address,username,password_aes,port,labels,notes) VALUES(?,?,?,?,?,?,?)',
    selectServer: 'SELECT * FROM servers where user_email = ?',
    insertDatabase: 'INSERT INTO database_info(user_email,username,password_aes,connection_option,labels,notes,address) VALUES(?,?,?,?,?,?,?)',
    selectDatabase: 'SELECT * FROM database_info where user_email = ?'
};

module.exports = user;