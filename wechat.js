var XMLJS = require('xml2js');
var builder = new XMLJS.Builder();
//微信客户端各类回调用接口
var EventFunction = {
  //关注
  subscribe: function(body, req, res) {
    var xml  = {xml: {
      ToUserName: body.FromUserName,
      FromUserName: body.ToUserName,
      CreateTime: + new Date(),
      MsgType: 'text',
      Content: '编辑@+您想说的话，我们可以收到'
  }};
  xml.xml.Content = '你好,第10号关注者'
  xml = builder.buildObject(xml);
  res.send(xml);
  },
  //注销
  unsubscribe: function(body, req, res) {
      console.log('再见了您嘞');
  },
  //打开某个网页
  VIEW: function() {
//根据需求，处理不同的业务
  },
//自动回复
  responseNews: function(body, res) {
//组装微信需要的json
      var xml  = {xml: {
          ToUserName: body.FromUserName,
          FromUserName: body.ToUserName,
          CreateTime: + new Date(),
          MsgType: 'text',
          Content: '编辑@+您想说的话，我们可以收到'
      }};
      var reciviMessage = body.Content[0]
      if(/^\@.*/.test(reciviMessage)) {
          xml.xml.Content = '已经收到您的建议，会及时处理！'
      }
      if(reciviMessage.indexOf("陈良峰")!=-1){
          xml.xml.Content = '你好，帅气的开发大大'
      }
      xml = builder.buildObject(xml);         // json转为xml
      res.send(xml);
  }
}

module.exports = EventFunction;

