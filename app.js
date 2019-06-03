//express_demo.js 文件
var express = require('express');
var sha1 = require('sha1');       //  秘要加密
var app = express();
var request = require('request'); // http请求
//xml解析模块
var XMLJS = require('xml2js');
//解析，将xml解析为json
var parser = new XMLJS.Parser();
//重组，将json重组为xml
var fs= require("fs");            // 
 
var EventFunction=require("./wechat")           //  接收的事件
var menu=require('./menuList')                  //  菜单列表

var info = {                      //  验证信息
    token: 'test',                //  your wechat token
    appid: 'wxac382a686f71ef96',  //  your wechat appid
    appsecret:'6cbe254818a1e4bad3863697b9db4e58',
    access_token:null,             // 每两小时发送的token
};

let url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+info.appid+"&secret="+info.appsecret+""
setInterval(function(){
    getAccessToken(url);
},7000000)
function getAccessToken(url){
    request(url, function (error, response, body) {         // 发送请求获取access_token
        let data=JSON.parse(body);
        info.access_token=data.access_token
        fs.writeFile('./token.txt', data.access_token , function(err) {});   // 将自己的token写入方便查看
        menu(data.access_token);
      });
}
getAccessToken(url);
// 获取access_token


app.post('/', function(req, res, next) {                                 // 接收请求，获取xml数据 对请求进行各种回馈
        req.on("data", function(data) {                                  // 将xml解析
            parser.parseString(data.toString(), function(err, result) {  // xml转字符串
                var body = result.xml;
                var messageType = body.MsgType[0];                       // 获取返回类型
                if(messageType === 'event') {
                    var eventName = body.Event[0];
                    (EventFunction[eventName]||function(){})(body, req, res);
                //自动回复消息
                }else if(messageType === 'text') {
                    EventFunction.responseNews(body, res);
                }else {
                    res.send('我好像无法理解您在说什么呢');
                }
            });
        });
});
 



// 验证判断
var server = app.listen(1234, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})