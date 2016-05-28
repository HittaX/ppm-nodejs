var user = {
    insert:'INSERT INTO users(email,password,status,salt) VALUES(?,?,0,?)',
    exist: 'SELECT ',
    selectByEmail:'SELECT * FROM users where email = ?',
    insertSite: 'INSERT INTO logins(user_email,website,sitename,username,password_aes,labels,notes) VALUES(?,?,?,?,?,?,?)',
    selectSite: 'SELECT * FROM logins where user_email = ?'
};

module.exports = user;