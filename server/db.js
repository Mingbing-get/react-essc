//导入配置选项
pz = require("./myconfig.js");

//导入第三方模块
const mysql = require("mysql");

//配置数据库选项
const db = mysql.createConnection({
    host : pz.host,
    user : pz.user,
    password : pz.password,
    database : pz.database
});

//链接数据库
db.connect((err)=>{
    if (err) return console.log("数据库链接失败");
    console.log("数据库链接成功");
});

//利用异步方法封装数据库函数
//查询数据库
exports.querydb = function (sql) {
   return new Promise(
      function(resolve, reject){
          db.query(sql, (err, result)=>{
              if (err)
                  reject(err);
              else
                  resolve(result);
          });
      }
  );
};
//删除，修改，增加
exports.updatedb = function (sql, post) {
   return new Promise(
       function (resolve, reject) {
           db.query(sql, post, (err, result)=>{
               if (err)
                   reject(err);
               else
                   resolve(result);
           });
       }
   )
};

//查询数据库
// exports.querydb = function (sql, callback) {
//     db.query(sql, (err, result)=>{
//         if (err) return callback(err);
//         callback(null, result);
//     });
// };

//插入数据
// var post = {zhanghu:'143',mima:'123',name:'张三',sex:'男',birthday:new Date(),touxiang:'13'};
// var sql = 'insert into users.vue set ?';
// db.query(sql,post,(err,result)=>{
//   if (err)
//      console.log(err);
//   else
//      console.log('插入成功');
// });

//查询数据
//  var sql = 'select * from users.vue';
//  db.query(sql, (err, result)=>{
//     if (err)
//        console.log(err);
//     else
//        console.log(result[0].name);
//  });

//修改数据
// var sql = 'update users.vue set name = ? where zhanghu = ?';
// var post = ['张三','123'];
// db.query(sql,post,(err,result)=>{
//   if (err)
//      console.log(err);
//   else
//      console.log('修改成功');
// });

//删除数据
// var sql = 'delete from users.vue where zhanghu=?';
// var post = ['143'];
// db.query(sql, post, (err,result)=>{
//    if (err)
//       console.log(err);
//     else
//        console.log(result.affectedRows);
// });


//使用方法
// db = require("./db.js");
// db.querydb("select * from users.vue where zhanghu='123'")
//     .then(function (result) {
//         console.log(result);
//         return db.updatedb("delete from users.vue where zhanghu='123'");
//     })
//     .then(function (result) {
//         console.log(result);
//         return db.updatedb('insert into users.vue  set ?',
//             {zhanghu:'143',mima:'123',name:'张三',sex:'男',birthday:new Date(),touxiang:'13'});
//     })
//     .then(function (result) {
//         console.log(result);
//         return db.querydb("select * from users.vue");
//     })
//     .then(function (result) {
//         console.log(result);
//         return db.updatedb('update users.vue set name=? where zhanghu=?',['李四','143']);
//     })
//     .then(function (result) {
//         console.log(result);
//         return db.querydb("select * from users.vue");
//     })
//     .then(function (result) {
//         console.log(result);
//     })
//     .catch(function (err) {
//         console.log(err.sqlMessage);
//     });