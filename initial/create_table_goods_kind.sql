/*
Navicat MySQL Data Transfer

Source Server         : ac
Source Server Version : 80015
Source Host           : localhost:3306
Source Database       : achospdb

Target Server Type    : MYSQL
Target Server Version : 80015
File Encoding         : 65001

Date: 2019-05-03 07:38:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goods_kind
-- ----------------------------
DROP TABLE IF EXISTS `goods_kind`;
CREATE TABLE `goods_kind` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of goods_kind
-- ----------------------------
INSERT INTO `goods_kind` VALUES ('1', '宠物牌');
INSERT INTO `goods_kind` VALUES ('2', '牵引线');
INSERT INTO `goods_kind` VALUES ('3', '宠物窝');
INSERT INTO `goods_kind` VALUES ('4', '宠物食品');
INSERT INTO `goods_kind` VALUES ('5', '宠物食具');
INSERT INTO `goods_kind` VALUES ('6', '宠物服装');
INSERT INTO `goods_kind` VALUES ('7', '宠物玩具');
INSERT INTO `goods_kind` VALUES ('8', '清洁用品');
INSERT INTO `goods_kind` VALUES ('9', '宠物药品');
INSERT INTO `goods_kind` VALUES ('10', '其他用品');
