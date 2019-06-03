var request = require('request'); // http请求

// button按钮列表
var menu=function(token){
    let menuList={
        "button": [
            {
                "type": "click", 
                "name": "读书之路", 
                "key": "book"
            }, 
            {
                "type": "click", 
                "name": "运动之路", 
                "key": "sport"
            }, 
            {
                "type": "click", 
                "name": "学习之路", 
                "key": "student"
            }, 
        ]
    }
    request({                                                                                            // 发送请求
        url:' https://api.weixin.qq.com/cgi-bin/menu/create?access_token='+token,            // 请求路径等info.accesstoken有值在用
        method: "POST",                            // 请求方式，默认为get
        headers: {                                 //设置请求头
            "content-type": "application/json",
        },
        body: JSON.stringify(menuList)             // post参数字符串
    }, function(error, response, body) {
                if(body.errmsg!="ok"){
                    console.log(body.errmsg);
                }
    });
}
// 自定义菜单
module.exports = menu;