var express = require('express');
var path = require('path');
var Movie = require('./model').Movie;
var app = express();
app.use(express.static(__dirname));

app.set('view engine','html');//设置模板引擎
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);

app.get('/',function (req, res) {
    Movie.find({},function (err, movies) {
        res.render('index',{movies})
    })
})
app.listen(80);