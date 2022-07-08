/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50568
 Source Host           : localhost:3306
 Source Schema         : scanner

 Target Server Type    : MySQL
 Target Server Version : 50568
 File Encoding         : 65001

 Date: 22/06/2022 11:40:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dict
-- ----------------------------
DROP TABLE IF EXISTS `dict`;
CREATE TABLE `dict`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `path` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `type` int(2) DEFAULT NULL,
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of dict
-- ----------------------------
INSERT INTO `dict` VALUES (2, '用户名', 'username/b62e0d0f368ec88e16779c6eb71dd4a2.txt', 1, '阿斯顿撒多');

-- ----------------------------
-- Table structure for req
-- ----------------------------
DROP TABLE IF EXISTS `req`;
CREATE TABLE `req`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `body` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `bodyDict` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `bodyParser` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `contentType` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `status` int(2) DEFAULT NULL,
  `result` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `method` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of req
-- ----------------------------
INSERT INTO `req` VALUES (1, 'http://localhost:3000/test', 'username=${u}&userName={p}', '[{\"u\":2,\"p\":2}]', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (2, 'http://localhost:3000/test', 'username=${u}&userName={p}', '[{\"u\":2,\"p\":2}]', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (3, 'http://localhost:3000/test', 'username=${u}&userName={p}', '[{\"u\":2,\"p\":2}]', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (4, 'http://localhost:3000/test', 'username=${u}&userName={p}', '[{\"u\":2,\"p\":2}]', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (5, 'http://localhost:3000/test', 'username=${u}&userName={p}', '[{\"u\":2,\"p\":2}]', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (6, 'http://localhost:3000/test', 'username=${u}&userName={p}', '[{\"u\":2,\"p\":2}]', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (7, 'http://localhost:3000/test', 'username=${u}&userName={p}', '[{\"u\":2,\"p\":2}]', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (8, 'http://localhost:3000/test', 'username=${u}&userName={p}', '[{\"u\":2,\"p\":2}]', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (9, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (10, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (11, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (12, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (13, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (14, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (15, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (16, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (17, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (18, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (19, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (20, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (21, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (22, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (23, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (24, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (25, 'http://localhost:3000/test', 'username=${u}&userName={p}', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (26, 'http://localhost:3000/test', 'username=${u}&userName=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (27, 'http://localhost:3000/test', 'username=${u}&userName=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (28, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (29, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (30, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (31, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (32, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (33, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (34, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (35, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (36, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (37, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (38, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (39, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (40, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (41, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (42, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (43, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (44, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (45, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (46, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (47, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (48, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (49, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (50, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (51, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');
INSERT INTO `req` VALUES (52, 'http://localhost:3000/test', 'username=${u}&password=${p}&a=1', '{\"u\":2,\"p\":2}', '(r) => { return false }', NULL, NULL, NULL, 'post');

SET FOREIGN_KEY_CHECKS = 1;
