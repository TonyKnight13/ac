/*
Navicat MySQL Data Transfer

Source Server         : hello
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : actestdb

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-05-19 22:11:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for pet_speci
-- ----------------------------
DROP TABLE IF EXISTS `pet_speci`;
CREATE TABLE `pet_speci` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pet_speci
-- ----------------------------
INSERT INTO `pet_speci` VALUES ('1', '猫');
INSERT INTO `pet_speci` VALUES ('2', '狗');
INSERT INTO `pet_speci` VALUES ('3', '兔');
INSERT INTO `pet_speci` VALUES ('4', '鸟');
INSERT INTO `pet_speci` VALUES ('5', '小型');
INSERT INTO `pet_speci` VALUES ('6', '水生');
INSERT INTO `pet_speci` VALUES ('7', '两栖');
INSERT INTO `pet_speci` VALUES ('8', '其它');
