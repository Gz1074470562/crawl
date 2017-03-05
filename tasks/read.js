/**
 * 1.写一个read模块，用来传入url地址，返回读取后的对象数组
 * 2.把上面的对象数组保存在数据库中mongodb
 * 3.建立一个web服务器显示保存的数据库
 * 4.开启一个计划任务每小时更新一次数据库
 * 5.把此项目发布github并且布署阿里云上
 */
var request = require('request');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var debug = require('debug')('crawl:read');
exports.movie = function (url, callback) {
    /*请求网址内容*/
    request({url,encoding:null},function (err, response, body) {
        //通过iconv.decode方法实现转码
        body = iconv.decode(body,'gbk');
        //把此响应体字符串转成$对象
        var $ = cheerio.load(body);
        var movies = [];
        $('.keyword .list-title').each(function () {
            //把当前对象转成jquery对象
            var $me = $(this);
            //声明一个电影对象，一个是标签文本对应的电影名称，一个是href属性指向url地址
            var movie = {
                name:$me.text(),
                url:$me.attr('href')
            }
            debug(`读到电影:${movie.name}`)
            movies.push(movie);
        });
        callback(err,movies);
    })
}
/*
exports.movie('http://top.baidu.com/buzz?b=7&c=10&fr=topcategory_c10',function (err, movie) {
    console.log(movie);
})*/
