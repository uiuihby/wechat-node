var XMLJS = require('xml2js');
var builder = new XMLJS.Builder();
//微信客户端各类回调用接口
function Template(body,content){
var xml  = {xml: {
    ToUserName: body.FromUserName,
    FromUserName: body.ToUserName,
    CreateTime: + new Date(),
    MsgType: 'text',
    Content: content
  }};

   xml = builder.buildObject(xml);
   return xml;
}
var EventFunction = {
  subscribe: function(body, req, res) {
    let xml=Template(body,"您好关注者")
    res.send(xml);
  },
  unsubscribe: function(body, req, res) {
      console.log('再见了您嘞');
  },
  book:function(body,req,res){
    let xml=Template(body,"读书功能正在努力开发中!!")
    res.send(xml);
  },
  sport:function(body,req,res){
    let xml=Template(body,"运动功能正在努力开发中!!")
    res.send(xml);
  },
  student:function(body,req,res){
    let xml=Template(body,"学习功能正在努力开发中!!")
    res.send(xml);
  },
  // 关注与注销
  responseNews: function(body, res) {          // 回复功能
      var reciviMessage = body.Content[0]
      if(/^\@.*/.test(reciviMessage)) {
        var xml=Template(body,"已经收到您的建议，会及时处理！")
      }
      if(reciviMessage.indexOf("陈良峰")!=-1){
        var xml=Template(body,"哇,是帅气的开发大大！")
      }
      xml = builder.buildObject(xml);         // json转为xml
      res.send(xml);
  }
}

module.exports = EventFunction;

