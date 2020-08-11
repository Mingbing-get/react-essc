//导入配置选项
pz = require("./myconfig.js");

//导入第三方模块
const http = require('http');
const socket_io = require('socket.io');

//导入自己写的模块
const app = require("./app.js");
const db = require("./db.js");
const server = http.createServer(app);

const io = socket_io.listen(server);

//用于保存所有的用户账户和对应的socket
var sockets = {};
//即时通信
io.on('connect', (socket)=>{
    //用户登录的时候，将该用户的zhanghu和它对应的socket存起来
    socket.on('user', (data)=>{
        sockets[data] = socket;
    });
    //用户退出登录的时候，将该用户的账户和对应的socket删除
    socket.on('logout', (data)=>{
        delete sockets[data];
    });
    //用户同意别的好友加他的时候触发
    socket.on('agreefriend', (data)=>{
        if (sockets[data])
            sockets[data].emit('agreefriend', true);
    });
    socket.on('message', (data)=>{
        if (sockets[data.receiver])
            sockets[data.receiver].emit('message', data);
        //将消息存到数据库中
        db.updatedb('insert into messages set ?', data)
            .then(result=>{})
            .catch(error=>{});
    });
});

//监听窗口
server.listen(pz.port, pz.dizi, ()=>{
   console.log("runing...");
});