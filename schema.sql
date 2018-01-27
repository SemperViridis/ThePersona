-- DROP DATABASE IF EXISTS test;

-- CREATE DATABASE test;

-- USE test;

-- CREATE TABLE items (
--   id int NOT NULL AUTO_INCREMENT,
--   quantity integer NOT NULL,
--   description varchar(50) NOT NULL,
--   PRIMARY KEY (ID)
-- );

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users'
--
-- ---

DROP DATABASE IF EXISTS Persona;

CREATE DATABASE Persona;

USE Persona;

CREATE TABLE Users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);

-- ---
-- Table 'Answers'
--
-- ---

DROP TABLE IF EXISTS Answers;

CREATE TABLE Answers (
  id int NOT NULL AUTO_INCREMENT,
  id_Comments int NULL DEFAULT,
  id_Prompts int NULL DEFAULT,
  id_Users int NOT NULL DEFAULT,
  Answer TEXT NULL DEFAULT,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Prompts'
--
-- ---

DROP TABLE IF EXISTS `Prompts`;

CREATE TABLE `Prompts` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NOT NULL,
  `id_Users` INTEGER NULL DEFAULT NULL,
  `Question` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Votes'
--
-- ---

DROP TABLE IF EXISTS `Votes`;

CREATE TABLE `Votes` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_Users` INTEGER NULL DEFAULT NULL,
  `id_Answers` INTEGER NULL DEFAULT NULL,
  `totalvotes` INTEGER NULL DEFAULT 0,
  `id_Comments` INTEGER NOT NULL DEFAULT NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Comments'
--
-- ---

DROP TABLE IF EXISTS `Comments`;

CREATE TABLE `Comments` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NOT NULL,
  `id_Users` INTEGER NULL DEFAULT NULL,
  `Comments` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Tags'
--
-- ---

DROP TABLE IF EXISTS `Tags`;

CREATE TABLE `Tags` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NOT NULL,
  `id_Prompts` INTEGER NULL DEFAULT NULL,
  `Tags` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Answers` ADD FOREIGN KEY (id_Comments) REFERENCES `Comments` (`id`);
ALTER TABLE `Answers` ADD FOREIGN KEY (id_Prompts) REFERENCES `Prompts` (`id`);
ALTER TABLE `Answers` ADD FOREIGN KEY (id_Users) REFERENCES `Users` (`id`);
ALTER TABLE `Prompts` ADD FOREIGN KEY (id_Users) REFERENCES `Users` (`id`);
ALTER TABLE `Votes` ADD FOREIGN KEY (id_Users) REFERENCES `Users` (`id`);
ALTER TABLE `Votes` ADD FOREIGN KEY (id_Answers) REFERENCES `Answers` (`id`);
ALTER TABLE `Votes` ADD FOREIGN KEY (id_Comments) REFERENCES `Comments` (`id`);
ALTER TABLE `Comments` ADD FOREIGN KEY (id_Users) REFERENCES `Users` (`id`);
ALTER TABLE `Tags` ADD FOREIGN KEY (id_Prompts) REFERENCES `Prompts` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Answers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Prompts` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Votes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Comments` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Tags` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Users` (`id`,`username`) VALUES
-- ('','');
-- INSERT INTO `Answers` (`id`,`id_Comments`,`id_Prompts`,`id_Users`,`Answer`) VALUES
-- ('','','','','');
-- INSERT INTO `Prompts` (`id`,`id_Users`,`Question`) VALUES
-- ('','','');
-- INSERT INTO `Votes` (`id`,`id_Users`,`id_Answers`,`totalvotes`,`id_Comments`) VALUES
-- ('','','','','');
-- INSERT INTO `Comments` (`id`,`id_Users`,`Comments`) VALUES
-- ('','','');
-- INSERT INTO `Tags` (`id`,`id_Prompts`,`Tags`) VALUES
-- ('','','');