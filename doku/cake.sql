-- MySQL dump 10.13  Distrib 5.5.37, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: cake
-- ------------------------------------------------------
-- Server version	5.5.37-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group` (
  `GROUP_ID` int(11) NOT NULL AUTO_INCREMENT,
  `GROUP_NAME` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `PROFESSOR_ID` int(11) NOT NULL,
  PRIMARY KEY (`GROUP_ID`),
  KEY `GROUP_ID` (`GROUP_ID`),
  KEY `PROFESSOR_ID` (`PROFESSOR_ID`),
  CONSTRAINT `group_ibfk_1` FOREIGN KEY (`PROFESSOR_ID`) REFERENCES `user` (`USER_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (0,'Public',0);
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `USER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FIRST_NAME` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `LAST_NAME` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `PASSWORD` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `ROLE` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `GROUP` int(10) DEFAULT NULL,
  `REG_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `GENDER` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 = MALE, 0 = FEMALE',
  PRIMARY KEY (`USER_ID`),
  KEY `GROUP` (`GROUP`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`GROUP`) REFERENCES `group` (`GROUP_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (0,'public@brilliancrm.com','Public','Public','$shiro1$SHA-256$500000$1OwniRYZrMQOHC1y8ZMIRg==$FIno2/G0dGuANfDCFqL/6Vgo7GqEQdINYahf7abe7dY=','professor',NULL,'2014-05-23 07:55:57',1),(16,'admin@brilliancrm.com','Dorothea','Langer','$shiro1$SHA-256$500000$sRxILcmjCxDxT53FupMwJQ==$kt3mthdn4qB4te3NJ/6DBJ79EOXlURxc/da5uo+vavI=','admin',NULL,'2014-05-23 07:54:59',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_progress`
--

DROP TABLE IF EXISTS `user_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_progress` (
  `USER_ID` int(11) NOT NULL,
  `COST` int(11) NOT NULL,
  `QUALITY` int(11) NOT NULL,
  `TIME` int(11) NOT NULL,
  `path` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`USER_ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `user_progress_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_progress`
--

LOCK TABLES `user_progress` WRITE;
/*!40000 ALTER TABLE `user_progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_progress` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-06-25  2:46:58
