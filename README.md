项目的主要使用技术：
    前端：react react-router react-redux socket.io-client fetch
    后端：node+express socket.io
    数据库：mysql
项目的功能：
    实现了用户购买、评价商品、包括（加入购物车，加入订单）等功能。
    另外使用serversocket技术，实现了即时通信，用户可以互相加好友，并进行聊天。
项目使用方法：
    1、运行essc.sql文件，生成数据库
    2、修改server/muconfig.js文件，配置对应的数据库参数和运行地址
    3、使用node server.js命令运行后端服务器
    4、修改src/package.json文件的proxy属性，为自己的服务器运行地址(处理跨域问题)
    5、使用npm start运行前端服务器