-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tecnojuy
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB
USE tecnojuy;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total` decimal(10,2) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuarios_faturas` (`id_usuario`),
  CONSTRAINT `fk_usuarios_faturas` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'DELL'),(2,'MSI'),(3,'LENOVO'),(4,'HP'),(5,'ASUS'),(6,'Samsung'),(7,'Sapphire'),(8,'ZOTAC'),(9,'Gigabyte'),(10,'Intel'),(11,'AMD'),(12,'Crucial'),(13,'Kingston'),(14,'Redragon'),(15,'Logitech'),(16,'Hyperx'),(17,'T-dagger'),(18,'Razer'),(19,'Sony'),(20,'NVDIA'),(21,'SolarMax'),(22,'EPSON'),(23,'ID-COOLING');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `id_marca` int(11) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `description` varchar(355) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `favorite` tinyint(1) DEFAULT NULL,
  `image` varchar(355) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_productos_marcas` (`id_marca`),
  KEY `fk_productos_usuarios` (`id_user`),
  CONSTRAINT `fk_productos_marcas` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id`),
  CONSTRAINT `fk_productos_usuarios` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Laptop Dell XPS 13',1,4,'Laptop ultradelgada con pantalla InfinityEdge y procesador Intel Core de 11ª generación.','Laptops',199999.00,20,0,'imagen1.jpg',1),(2,'PC de escritorio HP Pavilion',4,3,'PC de escritorio potente con procesador Intel Core i7 y tarjeta gráfica NVIDIA GeForce RTX 3060.','PC de escritorio',499999.00,20,0,'imagen2.jpg',1),(3,'Monitor ASUS ROG Strix',5,3,'Monitor de gaming de 27 pulgadas con resolución QHD y frecuencia de actualización de 165Hz.','Monitores',19999.00,10,0,'imagen3.jpg',1),(4,'Teclado mecánico Razer BlackWidow',18,2,'Teclado mecánico para gaming con interruptores Razer Green y retroiluminación personalizable.','Periféricos',79000.00,15,0,'imagen4.jpg',1),(5,'Mouse inalámbrico Logitech MX Master 3',15,10,'Mouse inalámbrico ergonómico con tecnología de seguimiento de alta precisión y botón para gestos personalizables.','Periféricos',99900.00,15,0,'imagen5.jpg',1),(6,'Auriculares Bluetooth Sony WH-1000XM4',19,5,'Auriculares con cancelación de ruido líder en la industria y hasta 30 horas de duración de la batería.','Auriculares',34900.00,20,0,'imagen6.jpg',1),(7,'SSD Samsung 970 EVO Plus',6,5,'Unidad de estado sólido NVMe PCIe M.2 con velocidades de lectura y escritura ultrarrápidas.','Almacenamiento',42999.00,20,0,'imagen7.jpg',1),(8,'Tarjeta gráfica NVIDIA GeForce RTX 3080',20,5,'Tarjeta gráfica de última generación con arquitectura Ampere para un rendimiento de gaming excepcional.','Componentes',699990.00,20,0,'imagen8.jpg',1),(9,'Placa base ASUS ROG Strix Z590-E',5,15,'Placa base ATX con socket LGA 1200 y soporte para procesadores Intel Core de 11ª generación.','Componentes',329990.00,20,0,'imagen9.jpg',1),(10,'Impresora multifunción HP OfficeJet Pro 9015',4,15,'Impresora multifunción con impresión a doble cara y conectividad Wi-Fi.','Impresoras',229990.00,20,0,'imagen10.jpg',1),(11,'Kingston Ram Fury Beast DDR4 RGB 16gb',13,10,'La Memoria RAM Fury Beast DDR4 RGB cuenta con un diseño elegante en color negro...','visited',67700.00,20,0,'kingstonram.png',1),(12,'Disco sólido interno Kingston 240gb',13,10,'La unidad en estado sólido A400 de Kingston está diseñada para las personas más exigentes...','visited',30099.00,20,0,'discoSolido.webp',1),(13,'Gabinete Solarmax 5920 Blanco',21,10,'El Gabinete Solarmax 5920 Blanco 6 Fan Rgb Vidrio Templado 1 es la elección perfecta para los gamers...','visited',89990.00,20,0,'D_NQ_NP_815458-MLU71621421091_092023-O.webp',1),(14,'GPU AMD ASRock RX 550 2gb',11,10,'AMD es un fabricante estadounidense de placas de video, por su tecnología se ha destacado en crear procesadores de alta gama...','visited',54999.00,12,0,'gpu-asrock2gb.webp',1),(15,'Procesador AMD Ryzen 5 5600G',11,10,'Ryzen 5 5600G, diseñado para brindarte un rendimiento excepcional en tus juegos favoritos...','visited',222999.00,0,0,'rayzen5g.webp',1),(16,'Impresora Epson Ecotank L3250',22,10,'Epson busca que sus clientes obtengan el máximo provecho de sus productos. Por ello, brinda soluciones de impresión con una amplia gama de dispositivos que cubren todos los usos y necesidades, tanto en casa como en el trabajo. Eficiencia y calidad Imprime archivos, escanea documentos y haz todas las fotocopias que necesites con esta impresora multifunci','in-sale',573999.00,5,0,'impresora.webp',1),(17,'Logitech Serie G Lightspeed G305',15,9,'Logitech diseña productos y experiencias que ocupan un lugar cotidiano en la vida de las personas, poniendo foco en la innovación y la calidad. Su objetivo es crear momentos verdaderamente únicos y significativos para sus usuarios. Los mouses Logitech se adaptan a la forma de tu mano para proporcionarte horas de comodidad. Sin necesidad de mover el braz','in-sale',52499.00,10,0,'mouseLogitech.webp',1),(18,'Redragon Shiva K512w',14,9,'Disfrutá de tus partidas en otro nivel con Redragon, marca reconocida que se especializa en brindar la mejor experiencia de juego al público gamer desde hace más de 20 años. Sus teclados se adaptan a todo tipo de jugadores y esto los convierten en un fiel reflejo de la alta gama y calidad que la compañía ofrece. Distinción a todo color Su retroiluminaci','in-sale',39999.00,5,0,'tecladoShiva.webp',1),(19,'Notebook Lenovo IdeaPad',3,100,'La notebook Lenovo 81X700FVUS Intel I5 1135g7 Ram 8gb Ssd 256gb Full hd Windows 11 es una solución tanto para trabajar y estudiar como para entretenerte. Al ser portátil, el escritorio dejará de ser tu único espacio de uso para abrirte las puertas a otros ambientes ya sea en tu casa o en la oficina. Pantalla con gran impacto visual Su pantalla de 14 te ','in-sale',735555.00,12,0,'D_NQ_NP_899021-MLA71605614798_092023-O.webp',1),(20,'Intel Core i5 i5-10400F',10,20,'Mejora tu experiencia de juego con el Procesador gamer Intel Core i5-10400F, diseñado para brindarte un rendimiento óptimo en tus partidas. Con sus 6 núcleos y 12 hilos de CPU, este procesador te permitirá disfrutar de tus juegos favoritos sin interrupciones ni demoras. Gracias a su arquitectura x86-64 y su frecuencia máxima de reloj de 4.3 GHz, podrás ','in-sale',201585.00,10,0,'inteli5.webp',1),(21,'Cooler Cpu Pc Gamer Id Cooling Se-224-xts Black',23,10,'Cooles CPU ofrece una calidad y luces RGB.','PC de Escritorio',1600.00,1,0,'AR1708607039433.webp',1),(23,'Mouse Redragon Cobra',14,20,'Sumérgete en el mundo de los videojuegos con el mouse gamer Redragon Cobra M711-FPS en color negro. Diseñado especialmente para diestros, este mouse de juego cuenta con un sensor óptico PixArt P3360 de alta precisión y una resolución de 24000 dpi, lo que te permitirá apuntar y moverte con total fluidez en tus partidas. Con sus 8 botones programables, po','Perifericos',37900.00,5,NULL,'AR1715891719846.png',NULL),(29,'Joystick ACCO Xbox X|S',3,23,'  PowerA es una marca líder reconocida por la venta de accesorios para videojuegos, productos accesibles y bien diseñados. Caracterizada por una fuerte pasión hacia los juegos, tiene la misión de brindarte todos los niveles de experiencias memorables que mejoren tu diversión y emoción.','Consolas',78900.00,2,NULL,'AR1716429980316.png',1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_de_carrito`
--

DROP TABLE IF EXISTS `productos_de_carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_de_carrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_carrito` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_productos_usados` (`id_producto`),
  KEY `fk_facturas_usada` (`id_carrito`),
  CONSTRAINT `fk_facturas_usada` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id`),
  CONSTRAINT `fk_productos_usados` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_de_carrito`
--

LOCK TABLES `productos_de_carrito` WRITE;
/*!40000 ALTER TABLE `productos_de_carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos_de_carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `birthday` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'leonel','condori','2000-02-29','leo.jr.0809@gmail.com','3885190199','leo13','$2a$10$uK7tUOtWdHD3ZjGZnz6eAOaG7/u4KqbPue8AaIAPyzVGPnOdeEmU6','usuario-defecto.png');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-02 21:11:42
