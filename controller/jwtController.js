const jwt = require('jsonwebtoken');

module.exports.getToken = (req, res) => {
    const {
        username,
        password
    } = req.body;
    if (username == 'ieeeiot' && password == '159357258456') {
        const payLoad = {
            username,
            password
        };
        const token = jwt.sign(payLoad, req.app.get("api_secret_key"), {

        });
        res.json({
            status: true,
            username,
            password,
            token
        });
    }
}

module.exports.checkAuth = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.body.token || req.query.token;
    if (!token)
        res.send("Token bulunmamaktadır.");
    else {
        jwt.verify(token, req.app.get("api_secret_key"), (error, decoded) => {
            if (error)
                res.send("Beklenmeyen bir hatayla karşılaşıldı.");
            else {
                req.decode = decoded;
                next();
            }
        });
    }
}