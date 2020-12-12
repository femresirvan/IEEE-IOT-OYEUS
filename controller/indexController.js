const db_operations = require('../lib/db_operations')

module.exports.renderIndex = (req, res, next) => {
    res.render('homepage');
    next();
};