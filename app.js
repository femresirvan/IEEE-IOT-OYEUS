const express = require('express');
const app = express();
const homeRouter = require('./routers/homeRouter');
const path = require('path');

app.use(homeRouter);
app.use(express.json());

app.set('view engine', 'ejs');

let port = process.env.port || 3000;

app.listen(port ,(err) => {
    if(err) throw err;
    console.log('sunucu basarıyla calıstırıdı');
});