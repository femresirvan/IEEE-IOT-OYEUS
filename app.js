const express = require("express");
const app = express();
const router = require('./routers/router');
const body_parser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const io = require('./controller/socketioController');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(cors());
app.use(body_parser.urlencoded({ 'extended': 'true' }));
app.use(body_parser.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.use('/', router);
app.set("api_secret_key", require("./lib/api_secret_key").api_secret_key);

const server = app.listen(port, () => {
    console.log('Sunucumuz calismaya baslamistir');
});

io.listen(server);
mongoose.connect('mongodb+srv://femresirvan:147852369Fee@cluster0.4ubsi.mongodb.net/ieeeiot?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("mongo baglantisi kuruldu.");
    })
    .catch((err) => {
        console.log("mongo baglanti hatasi");
    });
require('./controller/mqttController')