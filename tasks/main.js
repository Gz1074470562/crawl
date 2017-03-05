var read = require('./read').movie;
var write = require('./write').movie;
var async = require('async');
var debug = require('debug')('crawl:main');
var url = 'http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1';
var Movie = require('../model').Movie;
async.waterfall([
    //在保存之前全部清空数据
    function (callback) {
        Movie.remove({},callback);
    },
    function (data,callback) {
        read(url,callback);
    },
    function (movies,callback) {
        write(movies,callback);
    }
],function (err,result) {
    debug('全部任务执行完毕');
});