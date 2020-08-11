/*
Navicat MySQL Data Transfer

Source Server         : mb
Source Server Version : 50644
Source Host           : localhost:3306
Source Database       : essc

Target Server Type    : MYSQL
Target Server Version : 50644
File Encoding         : 65001

Date: 2020-08-11 12:51:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for augment
-- ----------------------------
DROP TABLE IF EXISTS `augment`;
CREATE TABLE `augment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsid` int(11) NOT NULL,
  `userzhanghu` varchar(11) NOT NULL,
  `time` datetime NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `goodsys` (`goodsid`),
  KEY `userys` (`userzhanghu`),
  CONSTRAINT `goodsys` FOREIGN KEY (`goodsid`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userys` FOREIGN KEY (`userzhanghu`) REFERENCES `users` (`zhanghu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of augment
-- ----------------------------
INSERT INTO `augment` VALUES ('1', '2', '123456', '2020-06-07 09:53:35', '手机就是好用');
INSERT INTO `augment` VALUES ('2', '2', '123456', '2020-06-02 10:22:08', '哎哟不错哟');
INSERT INTO `augment` VALUES ('3', '2', '123456', '2020-06-08 10:31:07', '好看');
INSERT INTO `augment` VALUES ('6', '2', '123456', '2020-06-07 14:28:15', '看起来不错啊');
INSERT INTO `augment` VALUES ('7', '2', '123456', '2020-06-07 14:35:05', 'ok');
INSERT INTO `augment` VALUES ('8', '2', '123456', '2020-06-07 14:45:20', '还行');
INSERT INTO `augment` VALUES ('9', '2', '123456', '2020-06-07 14:45:34', '还会再买');
INSERT INTO `augment` VALUES ('10', '2', '123456', '2020-06-07 14:47:01', '再来一个');
INSERT INTO `augment` VALUES ('11', '2', '123456', '2020-06-07 14:47:18', '颜色好看');
INSERT INTO `augment` VALUES ('12', '2', '123456', '2020-06-07 14:47:49', '屏幕大');
INSERT INTO `augment` VALUES ('13', '2', '123456', '2020-06-07 14:48:21', '运行快');
INSERT INTO `augment` VALUES ('14', '2', '123456', '2020-06-07 14:57:01', 'nice');
INSERT INTO `augment` VALUES ('15', '2', '123456', '2020-06-09 20:22:11', '12');
INSERT INTO `augment` VALUES ('16', '1', '1234567', '2020-06-13 10:46:34', '好用');
INSERT INTO `augment` VALUES ('17', '2', '1234567', '2020-06-13 10:53:25', '还不错');
INSERT INTO `augment` VALUES ('21', '1', '123457', '2020-08-05 11:53:31', '好看');
INSERT INTO `augment` VALUES ('22', '1', '123457', '2020-08-05 11:55:25', '屏幕大');
INSERT INTO `augment` VALUES ('23', '1', '123457', '2020-08-05 11:55:51', '颜色鲜艳');
INSERT INTO `augment` VALUES ('24', '2', '123457', '2020-08-05 11:56:28', '像素高');
INSERT INTO `augment` VALUES ('25', '1', '123457', '2020-08-05 13:45:50', 'nice');
INSERT INTO `augment` VALUES ('26', '8', '123457', '2020-08-11 12:34:16', '好看');

-- ----------------------------
-- Table structure for car
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userzhanghu` varchar(11) NOT NULL,
  `goodsid` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `cselect` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cuserys` (`userzhanghu`),
  KEY `cgoodsys` (`goodsid`),
  CONSTRAINT `cgoodsys` FOREIGN KEY (`goodsid`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cuserys` FOREIGN KEY (`userzhanghu`) REFERENCES `users` (`zhanghu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car
-- ----------------------------
INSERT INTO `car` VALUES ('21', '123456', '10', '2', '否');
INSERT INTO `car` VALUES ('23', '123456', '8', '2', '是');
INSERT INTO `car` VALUES ('24', '123456', '2', '1', '是');
INSERT INTO `car` VALUES ('25', '1234567', '1', '1', '是');
INSERT INTO `car` VALUES ('40', '123457', '4', '2', '是');
INSERT INTO `car` VALUES ('43', '123457', '1', '1', '是');
INSERT INTO `car` VALUES ('44', '123457', '7', '1', '否');
INSERT INTO `car` VALUES ('45', '123457', '8', '1', '是');
INSERT INTO `car` VALUES ('46', '123457', '10', '1', '是');

-- ----------------------------
-- Table structure for dingdan
-- ----------------------------
DROP TABLE IF EXISTS `dingdan`;
CREATE TABLE `dingdan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userzhanghu` varchar(11) NOT NULL,
  `goodsids` varchar(255) NOT NULL,
  `counts` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `duserys` (`userzhanghu`),
  CONSTRAINT `duserys` FOREIGN KEY (`userzhanghu`) REFERENCES `users` (`zhanghu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dingdan
-- ----------------------------
INSERT INTO `dingdan` VALUES ('6', '123456', '2', '2', '2198.00', '已付款');
INSERT INTO `dingdan` VALUES ('8', '123456', '3,8', '3,1', '3166.00', '已付款');
INSERT INTO `dingdan` VALUES ('9', '123456', '2,5', '1,1', '3798.00', '未付款');
INSERT INTO `dingdan` VALUES ('11', '123456', '7', '2', '2198.00', '未付款');
INSERT INTO `dingdan` VALUES ('12', '123456', '2', '1', '1099.00', '已付款');
INSERT INTO `dingdan` VALUES ('27', '123456', '1', '1', '666.00', '已付款');
INSERT INTO `dingdan` VALUES ('28', '123456', '7', '1', '1099.00', '已付款');
INSERT INTO `dingdan` VALUES ('29', '123456', '7', '1', '1099.00', '已付款');
INSERT INTO `dingdan` VALUES ('30', '1234567', '1', '2', '1332.00', '未付款');
INSERT INTO `dingdan` VALUES ('31', '1234567', '7', '1', '1099.00', '已付款');
INSERT INTO `dingdan` VALUES ('32', '123457', '1', '1', '666.00', '已付款');
INSERT INTO `dingdan` VALUES ('35', '123457', '7,8', '3,1', '3466.00', '已付款');
INSERT INTO `dingdan` VALUES ('51', '123457', '2', '1', '1099.00', '未付款');
INSERT INTO `dingdan` VALUES ('52', '123457', '8', '1', '169.00', '已付款');
INSERT INTO `dingdan` VALUES ('53', '123457', '7', '1', '1099.00', '已付款');
INSERT INTO `dingdan` VALUES ('54', '123457', '4', '1', '1999.00', '未付款');

-- ----------------------------
-- Table structure for esadmi
-- ----------------------------
DROP TABLE IF EXISTS `esadmi`;
CREATE TABLE `esadmi` (
  `zhanghu` varchar(11) NOT NULL,
  `mima` varchar(20) NOT NULL,
  `name` varchar(7) NOT NULL,
  `level` varchar(10) NOT NULL,
  PRIMARY KEY (`zhanghu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of esadmi
-- ----------------------------
INSERT INTO `esadmi` VALUES ('123456', '123', '管理员', '1');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `discription` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `nowprice` decimal(10,2) NOT NULL,
  `images` varchar(400) NOT NULL,
  `userzhanghu` varchar(11) NOT NULL,
  `number` int(11) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `user` (`userzhanghu`),
  KEY `gstatus` (`status`),
  CONSTRAINT `gstatus` FOREIGN KEY (`status`) REFERENCES `goodsstatus` (`status`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user` FOREIGN KEY (`userzhanghu`) REFERENCES `users` (`zhanghu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '5G手机', '最新5G手机', '999.00', '666.00', '/public/goodsimage/1.jpg', '123456', '158', '活动');
INSERT INTO `goods` VALUES ('2', '5G手机', '最新5G手机', '1500.00', '1099.00', '/public/goodsimage/2.jpg;/public/goodsimage/3.jpg', '123456', '198', '活动');
INSERT INTO `goods` VALUES ('3', '5G手机', '最新5G手机', '2000.00', '899.00', '/public/goodsimage/3.jpg', '123456', '95', '出售');
INSERT INTO `goods` VALUES ('4', '5G手机新款', '最新5G手机', '3000.00', '1999.00', '/public/goodsimage/4.jpg', '123456', '98', '精选');
INSERT INTO `goods` VALUES ('5', '沙发', '真皮沙发', '4000.00', '2699.00', '/public/goodsimage/5.jpg', '123456', '19', '出售');
INSERT INTO `goods` VALUES ('6', '饭桌', '实木饭桌', '1600.00', '999.00', '/public/goodsimage/6.jpg', '123456', '15', '出售');
INSERT INTO `goods` VALUES ('7', '柜子', '超大酒柜', '1999.00', '1099.00', '/public/goodsimage/7.jpg', '123456', '2', '精选');
INSERT INTO `goods` VALUES ('8', '玩具', '机器小狗玩具', '200.00', '169.00', '/public/goodsimage/8.jpg', '123456', '15', '精选');
INSERT INTO `goods` VALUES ('9', '玩具', '玩具赛车', '150.00', '139.00', '/public/goodsimage/9.jpg', '123456', '98', '精选');
INSERT INTO `goods` VALUES ('10', '玩具', '益智积木', '300.00', '199.00', '/public/goodsimage/10.jpg', '123456', '49', '热卖');
INSERT INTO `goods` VALUES ('11', '鞋子', '多种样子的鞋子', '366.00', '349.00', 'public/goodsimage/upload_ca4bed19d3f5d5a1427fc5f66d00b57b.webp', '123457', '600', '出售');
INSERT INTO `goods` VALUES ('12', '口红', '好看的口红', '486.00', '399.00', 'public/goodsimage/upload_d266859a5bf177b0e9363f111ba01927.webp', '123457', '200', '出售');

-- ----------------------------
-- Table structure for goodsstatus
-- ----------------------------
DROP TABLE IF EXISTS `goodsstatus`;
CREATE TABLE `goodsstatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodsstatus
-- ----------------------------
INSERT INTO `goodsstatus` VALUES ('2', '停售');
INSERT INTO `goodsstatus` VALUES ('1', '出售');
INSERT INTO `goodsstatus` VALUES ('5', '活动');
INSERT INTO `goodsstatus` VALUES ('4', '热卖');
INSERT INTO `goodsstatus` VALUES ('3', '精选');

-- ----------------------------
-- Table structure for lunbo
-- ----------------------------
DROP TABLE IF EXISTS `lunbo`;
CREATE TABLE `lunbo` (
  `inid` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `discription` varchar(255) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `pingtai` varchar(10) NOT NULL,
  PRIMARY KEY (`inid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lunbo
-- ----------------------------
INSERT INTO `lunbo` VALUES ('1', '/public/static/image/phone.jpg', '手机', '去购买5G手机', '展示', 'pc,phone');
INSERT INTO `lunbo` VALUES ('2', '/public/static/image/jiadian.jpg', '家电', '去购买家电', '展示', 'pc,phone');
INSERT INTO `lunbo` VALUES ('3', '/public/static/image/jiaju.jpg', '家具', '去购买家具', '展示', 'pc,phone');
INSERT INTO `lunbo` VALUES ('5', '/public/static/image/upload_4b97123469d1619d98b597ddbc7a3478.jpg', '玩具', '去购买玩具', '不展示', 'pc,phone');
INSERT INTO `lunbo` VALUES ('6', '/public/static/image/logo.jpg', '图标', '商城图标', '不展示', 'pc,phone');
INSERT INTO `lunbo` VALUES ('8', '/public/static/image/ydphone.jpg', '手机', '去购买5G手机', '不展示', 'phone');

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` varchar(11) NOT NULL,
  `receiver` varchar(11) NOT NULL,
  `time` datetime NOT NULL,
  `content` varchar(255) NOT NULL,
  `isread` varchar(2) NOT NULL DEFAULT '否',
  PRIMARY KEY (`id`),
  KEY `send` (`sender`),
  KEY `receive` (`receiver`),
  CONSTRAINT `receive` FOREIGN KEY (`receiver`) REFERENCES `users` (`zhanghu`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `send` FOREIGN KEY (`sender`) REFERENCES `users` (`zhanghu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of messages
-- ----------------------------
INSERT INTO `messages` VALUES ('1', '123457', '123456', '2020-08-09 11:56:26', '你好', '是');
INSERT INTO `messages` VALUES ('2', '123456', '123457', '2020-08-09 11:59:36', 'ok', '是');
INSERT INTO `messages` VALUES ('3', '123457', '123456', '2020-08-09 12:44:44', 'n', '是');
INSERT INTO `messages` VALUES ('4', '123457', '123456', '2020-08-09 12:44:46', 'i', '是');
INSERT INTO `messages` VALUES ('5', '123457', '123456', '2020-08-09 12:44:48', 'c', '是');
INSERT INTO `messages` VALUES ('6', '123457', '123456', '2020-08-09 12:44:49', 'e', '是');
INSERT INTO `messages` VALUES ('7', '123457', '123456', '2020-08-09 12:44:52', '1', '是');
INSERT INTO `messages` VALUES ('8', '123457', '123456', '2020-08-09 12:44:52', '', '是');
INSERT INTO `messages` VALUES ('9', '123457', '123456', '2020-08-09 12:51:47', '123', '是');
INSERT INTO `messages` VALUES ('10', '123457', '123456', '2020-08-09 12:53:08', 'abc', '是');
INSERT INTO `messages` VALUES ('11', '123456', '123457', '2020-08-09 13:28:11', '你好', '是');
INSERT INTO `messages` VALUES ('12', '123456', '123457', '2020-08-09 13:59:49', '你好', '是');
INSERT INTO `messages` VALUES ('13', '1234567', '123456', '2020-08-10 15:00:13', '你好', '是');
INSERT INTO `messages` VALUES ('14', '123456', '1234567', '2020-08-10 15:00:21', '你也好', '是');
INSERT INTO `messages` VALUES ('15', '123456', '1234567', '2020-08-10 16:33:04', '你好', '是');
INSERT INTO `messages` VALUES ('16', '123456', '1234567', '2020-08-10 16:33:54', '11', '是');
INSERT INTO `messages` VALUES ('17', '123456', '1234567', '2020-08-10 16:34:00', '12', '是');
INSERT INTO `messages` VALUES ('18', '123456', '1234567', '2020-08-10 16:34:06', '13', '是');
INSERT INTO `messages` VALUES ('19', '123456', '1234567', '2020-08-10 16:35:12', '14', '是');
INSERT INTO `messages` VALUES ('20', '123456', '1234567', '2020-08-10 16:35:19', '15', '是');
INSERT INTO `messages` VALUES ('21', '123456', '1234567', '2020-08-10 16:35:28', '16', '是');
INSERT INTO `messages` VALUES ('22', '123456', '1234567', '2020-08-10 16:36:40', '17', '是');
INSERT INTO `messages` VALUES ('23', '123456', '1234567', '2020-08-10 16:36:47', '18', '是');
INSERT INTO `messages` VALUES ('24', '123456', '1234567', '2020-08-10 16:44:19', '19', '是');
INSERT INTO `messages` VALUES ('25', '1234567', '123456', '2020-08-10 18:02:23', '20', '否');
INSERT INTO `messages` VALUES ('26', '1234567', '123456', '2020-08-10 18:33:12', '。。', '否');
INSERT INTO `messages` VALUES ('27', '1234567', '123456', '2020-08-10 18:34:17', '21', '否');
INSERT INTO `messages` VALUES ('28', '1234567', '123456', '2020-08-10 18:37:03', '22', '否');
INSERT INTO `messages` VALUES ('29', '1234567', '123456', '2020-08-10 18:41:16', '23', '否');
INSERT INTO `messages` VALUES ('30', '1234567', '123456', '2020-08-10 18:44:11', '24', '否');
INSERT INTO `messages` VALUES ('31', '1234567', '123456', '2020-08-10 18:44:18', '25', '否');
INSERT INTO `messages` VALUES ('32', '123457', '123456', '2020-08-10 18:45:19', '你好', '是');
INSERT INTO `messages` VALUES ('33', '123457', '123456', '2020-08-10 19:11:02', '12', '是');
INSERT INTO `messages` VALUES ('34', '123457', '123456', '2020-08-10 19:11:43', '13', '是');
INSERT INTO `messages` VALUES ('35', '123456', '123457', '2020-08-10 19:12:57', '15', '是');
INSERT INTO `messages` VALUES ('36', '123457', '123456', '2020-08-10 19:13:05', '16', '是');
INSERT INTO `messages` VALUES ('37', '123457', '123456', '2020-08-10 19:13:23', '17', '是');
INSERT INTO `messages` VALUES ('38', '123457', '123456', '2020-08-10 19:13:34', '18', '是');
INSERT INTO `messages` VALUES ('39', '123457', '123456', '2020-08-11 11:52:23', '19', '是');
INSERT INTO `messages` VALUES ('40', '123457', '123456', '2020-08-11 11:53:10', '20', '是');
INSERT INTO `messages` VALUES ('41', '123457', '123456', '2020-08-11 11:53:56', '21', '是');
INSERT INTO `messages` VALUES ('42', '123457', '123456', '2020-08-11 11:54:05', '22', '是');
INSERT INTO `messages` VALUES ('43', '123457', '123456', '2020-08-11 12:05:28', '23', '是');
INSERT INTO `messages` VALUES ('44', '123457', '123456', '2020-08-11 12:05:46', '24', '是');
INSERT INTO `messages` VALUES ('45', '123457', '123456', '2020-08-11 12:05:53', '25', '是');
INSERT INTO `messages` VALUES ('46', '123457', '123456', '2020-08-11 12:05:57', '26', '是');
INSERT INTO `messages` VALUES ('47', '123457', '123456', '2020-08-11 12:12:38', '27', '是');
INSERT INTO `messages` VALUES ('48', '123457', '123456', '2020-08-11 12:12:54', '28', '是');
INSERT INTO `messages` VALUES ('49', '123457', '123456', '2020-08-11 12:13:02', '29', '是');
INSERT INTO `messages` VALUES ('50', '123457', '123456', '2020-08-11 12:13:08', '30', '是');
INSERT INTO `messages` VALUES ('51', '123457', '123456', '2020-08-11 12:13:14', '31', '是');
INSERT INTO `messages` VALUES ('52', '123456', '123457', '2020-08-11 12:14:15', '32', '是');
INSERT INTO `messages` VALUES ('53', '123457', '123456', '2020-08-11 12:14:29', '33', '是');
INSERT INTO `messages` VALUES ('54', '123457', '123456', '2020-08-11 12:14:47', '34', '是');
INSERT INTO `messages` VALUES ('55', '123457', '123456', '2020-08-11 12:14:53', '35', '是');
INSERT INTO `messages` VALUES ('56', '123457', '123456', '2020-08-11 12:22:43', '36', '是');
INSERT INTO `messages` VALUES ('57', '123457', '123456', '2020-08-11 12:22:53', '37', '是');
INSERT INTO `messages` VALUES ('58', '123457', '123456', '2020-08-11 12:23:07', '38', '是');
INSERT INTO `messages` VALUES ('59', '123457', '123456', '2020-08-11 12:23:51', '39', '是');
INSERT INTO `messages` VALUES ('60', '123457', '123456', '2020-08-11 12:25:15', '40', '是');
INSERT INTO `messages` VALUES ('61', '123457', '123456', '2020-08-11 12:26:10', '41', '是');
INSERT INTO `messages` VALUES ('62', '123457', '123456', '2020-08-11 12:26:17', '42', '是');
INSERT INTO `messages` VALUES ('63', '123457', '123456', '2020-08-11 12:26:41', '43', '是');

-- ----------------------------
-- Table structure for newfriend
-- ----------------------------
DROP TABLE IF EXISTS `newfriend`;
CREATE TABLE `newfriend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` varchar(11) NOT NULL,
  `receiver` varchar(11) NOT NULL,
  `time` datetime NOT NULL,
  `agree` varchar(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fsender` (`sender`),
  KEY `frecevier` (`receiver`),
  CONSTRAINT `frecevier` FOREIGN KEY (`receiver`) REFERENCES `users` (`zhanghu`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fsender` FOREIGN KEY (`sender`) REFERENCES `users` (`zhanghu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of newfriend
-- ----------------------------
INSERT INTO `newfriend` VALUES ('11', '123456', '1234567', '2020-08-09 21:44:50', '是');
INSERT INTO `newfriend` VALUES ('12', '1234568', '1234567', '2020-08-10 13:03:03', '否');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `zhanghu` varchar(11) NOT NULL,
  `mima` varchar(255) NOT NULL,
  `name` varchar(7) NOT NULL,
  `sex` varchar(2) NOT NULL DEFAULT '',
  `birthday` date DEFAULT NULL,
  `touxiang` varchar(255) DEFAULT NULL,
  `friends` varchar(1100) DEFAULT NULL,
  PRIMARY KEY (`zhanghu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('123456', '$2a$10$avJpn7JMVNCBm7mHxHiMluTNVN4IdInTHI5q0g1ZtOpG/Qh/J7aY2', '张三', '女', '1998-01-04', '/public/image/upload_c4086e5599910730ee58037e9dcdeabb.jpg', '123457,1234567');
INSERT INTO `users` VALUES ('1234567', '$2a$10$avJpn7JMVNCBm7mHxHiMluTNVN4IdInTHI5q0g1ZtOpG/Qh/J7aY2', '李四', '男', '0000-00-00', '/public/image/upload_8268d35451ea49d3f597b199ada965b9.png', '123456');
INSERT INTO `users` VALUES ('1234568', '$2a$10$avJpn7JMVNCBm7mHxHiMluTNVN4IdInTHI5q0g1ZtOpG/Qh/J7aY2', '赵六', '男', null, '/public/image/upload_8268d35451ea49d3f597b199ada965b9.png', null);
INSERT INTO `users` VALUES ('123457', '$2a$10$avJpn7JMVNCBm7mHxHiMluTNVN4IdInTHI5q0g1ZtOpG/Qh/J7aY2', '王五', '男', '1998-06-02', 'public/image/upload_62ce5e96861fc06a06d30fdf4522f4f3.png', '123456');
