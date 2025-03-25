-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 25, 2025 at 09:30 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pet_adoption`
--

-- --------------------------------------------------------

--
-- Table structure for table `adoption_records`
--

CREATE TABLE `adoption_records` (
  `user_id` int(5) NOT NULL,
  `pet_id` int(5) NOT NULL,
  `adopted_before` varchar(20) NOT NULL,
  `other_pets` varchar(20) NOT NULL,
  `suitable_living_space` varchar(20) NOT NULL,
  `reason_for_adoption` text NOT NULL,
  `adoption_date` date NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `user_id` int(5) NOT NULL,
  `pet_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pet`
--

CREATE TABLE `pet` (
  `pet_id` int(5) NOT NULL,
  `pet_name` varchar(20) NOT NULL,
  `location` varchar(50) NOT NULL,
  `pet_type` varchar(20) NOT NULL,
  `post_date` date NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pet`
--

INSERT INTO `pet` (`pet_id`, `pet_name`, `location`, `pet_type`, `post_date`, `description`) VALUES
(10000, 'Bella', 'Vancouver', 'dog', '2025-01-01', 'Bella is a friendly and well-trained golden retriever who loves playing fetch in the park. She is great with kids and other dogs, perfect family pet.'),
(10001, 'Whiskers', 'Burnaby', 'cat', '2025-01-03', 'Whiskers is a gentle gray tabby cat who enjoys lounging by the window and soaking up the sun. She loves cuddles and is very affectionate.'),
(10002, 'Thunder', 'Richmond', 'horse', '2025-01-04', 'Thunder is a majestic black stallion with a calm temperament. He is trained for trail rides and enjoys open pastures. Ideal for experienced riders.'),
(10003, 'Fluffy', 'Coquitlam', 'rabbit', '2025-01-07', 'Fluffy is a cute white bunny with floppy ears who loves being petted. She enjoys hopping around and munching on fresh greens and carrots.'),
(10004, 'Sunny', 'Surrey', 'bird', '2025-01-08', 'Sunny is a bright yellow parrot known for singing beautiful melodies every morning. He is social and can mimic a few words with regular interaction.'),
(10005, 'Goldie', 'North Vancouver', 'fish', '2025-01-12', 'Goldie is a graceful goldfish with shimmering scales. Easy to care for, she adds a calming presence to any aquarium.'),
(10006, 'Oreo', 'New Westminster', 'cat', '2025-01-15', 'Oreo is a playful black and white kitten who loves chasing toys and exploring new spaces. Very friendly and gets along with other pets.'),
(10007, 'Rocky', 'Coquitlam', 'dog', '2025-01-19', 'Rocky is an energetic husky with striking blue eyes. He loves outdoor adventures, long walks, and playing with his favorite ball.'),
(10008, 'Shadow', 'Delta', 'horse', '2025-01-22', 'Shadow is a beautiful brown mare with a gentle personality. She is perfect for light riding and enjoys quiet time in the stable or out in the field.'),
(10009, 'Nibbles', 'Langley', 'rabbit', '2025-01-28', 'Nibbles is a sweet little bunny who loves attention and treats. She enjoys being held and will happily sit on your lap while nibbling on vegetables.'),
(10010, 'Daisy', 'Vancouver', 'dog', '2025-02-01', 'Daisy is a sweet golden doodle who loves long walks along the seawall. Friendly with kids and other dogs, perfect for a family.'),
(10011, 'Milo', 'Burnaby', 'cat', '2025-02-03', 'Milo is an adventurous orange tabby who loves exploring high places. He is food-motivated and purrs loudly when happy.'),
(10012, 'Spirit', 'Richmond', 'horse', '2025-02-05', 'Spirit is a beautiful young black horse, ideal for trail rides. Calm and bonds quickly with gentle riders.'),
(10013, 'Mochi', 'Coquitlam', 'rabbit	', '2025-02-06', 'Mochi is a fluffy grey bunny who enjoys fresh greens and hopping around the living room. Loves being hand-fed treats.\r\n'),
(10014, 'Kiwi', 'Surrey', 'bird', '2025-02-08', 'Kiwi is a talkative green parakeet that enjoys learning new words. Social and loves sitting on your shoulder.'),
(10015, 'Bubbles', 'North Vancouver', 'fish', '2025-02-10', 'Bubbles is a vibrant betta fish with long flowing fins. Peaceful and easy to care for, perfect for any small tank.'),
(10016, 'Luna', 'New Westminster', 'cat', '2025-02-12', 'Luna is a shy black cat who warms up quickly with treats. Loves chin scratches and sunbathing by the window.'),
(10017, 'Max', 'Coquitlam', 'dog', '2025-02-14', 'Max is a high-energy Labrador retriever who loves swimming and fetch. Always ready for outdoor adventures.'),
(10018, 'Maple', 'Delta', 'horse', '2025-02-17', 'Maple is a gentle brown mare, perfect for beginner riders. She is calm and enjoys peaceful walks through fields and forests.'),
(10019, 'Peanut', 'Langley', 'rabbit', '2025-02-19', 'Peanut is a small tan bunny who loves cuddles and chewing on cardboard toys. Great with kids.'),
(10020, 'Sky', 'Vancouver', 'bird', '2025-02-20', 'Sky is a blue budgie with a sweet singing voice. Loves sitting by the window and watching the world outside.'),
(10021, 'Coral', 'Burnaby', 'fish', '2025-02-22', 'Coral is a bright neon tetra, perfect for community tanks. Loves swimming in schools and creates a colorful display.'),
(10022, 'Tiger', 'Richmond', 'cat', '2025-02-25', 'Tiger is a playful tabby cat who loves climbing and exploring. Gets along well with other pets.'),
(10023, 'Bruno', 'Coquitlam', 'dog', '2025-02-27', 'Bruno is a loyal German Shepherd who is protective but loving. Excellent family dog with basic obedience training.'),
(10024, 'Hazel', 'Surrey', 'rabbit', '2025-03-01', 'Hazel is a gentle brown rabbit who enjoys being brushed. Prefers quiet environments and soft bedding.'),
(10025, 'Mango', 'North Vancouver', 'bird', '2025-03-03', 'Mango is a colorful sun conure with a playful personality. Loves fruit treats and knows a few words.'),
(10026, 'Neptune', 'New Westminster', 'fish', '2025-03-05', 'Neptune is a large koi fish with stunning orange and white patterns. Peaceful and ideal for ponds.'),
(10027, 'Olive', 'Coquitlam', 'cat', '2025-03-07', 'Olive is a sweet rescue cat with mismatched eyes. Loves sleeping in cozy corners and being brushed.'),
(10028, 'Diesel', 'Delta', 'dog', '2025-03-09', 'Diesel is a strong Rottweiler with a calm demeanor. Great guard dog but gentle with family.'),
(10029, 'Coco', 'Langley', 'rabbit', '2025-03-11', 'Coco is a curious black rabbit who enjoys exploring the backyard. Loves munching on lettuce and carrots.'),
(10030, 'Blue', 'Vancouver', 'bird', '2025-03-12', 'Blue is a majestic macaw with bright blue feathers. Enjoys flying in open spaces and mimicking sounds.'),
(10031, 'Marble', 'Burnaby', 'fish', '2025-03-14', 'Marble is a marble-patterned angelfish who adds elegance to any tank. Loves swimming through plants.'),
(10032, 'Simba', 'Richmond', 'cat', '2025-03-16', 'Simba is a big fluffy Maine Coon who loves being the center of attention. Very social and good with children.'),
(10033, 'Rocky', 'Coquitlam', 'dog', '2025-03-18', 'Rocky is a husky mix with endless energy. Enjoys hikes and outdoor play. Best suited for an active family.\r\n'),
(10034, 'Snowball', 'Surrey', 'rabbit', '2025-03-20', 'Snowball is a pure white rabbit with red eyes. Very gentle and loves nibbling on apples.'),
(10035, 'Lemon', 'North Vancouver', 'bird', '2025-03-22', 'Lemon is a small canary with a bright yellow coat. Known for singing sweet melodies every morning.'),
(10036, 'Flash', 'New Westminster', 'fish', '2025-03-24', 'Flash is a speedy goldfish who loves racing around the tank. Very active and fun to watch.'),
(10037, 'Bella', 'Coquitlam', 'cat', '2025-03-26', 'Bella is a loving Siamese cat who enjoys being close to people. Loves sitting on laps and purring for hours.'),
(10038, 'Rex', 'Delta', 'dog', '2025-03-28', 'Rex is a border collie known for his intelligence and agility. Perfect for someone who loves training and outdoor activities.'),
(10039, 'Carrot', 'Langley', 'rabbit', '2025-03-30', 'Carrot is an orange bunny who gets excited every time she sees her food bowl. Very friendly and loves to play.');

-- --------------------------------------------------------

--
-- Table structure for table `pet_images`
--

CREATE TABLE `pet_images` (
  `pet_id` int(5) NOT NULL,
  `images` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pet_tags`
--

CREATE TABLE `pet_tags` (
  `pet_id` int(5) NOT NULL,
  `tag_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `preferences`
--

CREATE TABLE `preferences` (
  `user_id` int(5) NOT NULL,
  `tag_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `provide_records`
--

CREATE TABLE `provide_records` (
  `user_id` int(5) NOT NULL,
  `pet_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `provide_records`
--

INSERT INTO `provide_records` (`user_id`, `pet_id`) VALUES
(10016, 10016),
(10016, 10030);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tag_id` int(5) NOT NULL,
  `content` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(5) NOT NULL,
  `user_type` varchar(20) NOT NULL,
  `user_name` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `legal_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `other_contact` varchar(50) NOT NULL,
  `profile_photo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_type`, `user_name`, `password`, `legal_name`, `email`, `other_contact`, `profile_photo`) VALUES
(10000, 'provider', 'jone_doe', '123', 'John Doe', 'john.doe@workmail.com', '123-456-7890', 'profilephoto/10000.jpg'),
(10001, 'provider', 'jane_smith', '123', 'Jane Smith', 'jane.smith@workmail.com', '321-645-8790', 'profilephoto/10001.jpg'),
(10002, 'provider', 'mike_lee', '123', 'Michael Lee', 'mike.lee@workmail.com', '555-578-1234', 'profilephoto/10002.jpg'),
(10003, 'provider', 'sarah_conner', '123', 'Sarah Conner', 'sara.conner@workmail.com', '123-778-0931', 'profilephoto/10003.jpg'),
(10004, 'provider', 'alex_wong', '123', 'Alex Wong', 'alex.wong@workmail.com', '789-445-1200', 'profilephoto/10004.jpg'),
(10005, 'provider', 'alice_chen', '123', 'Alice Chen', 'alice.chen@workmail.com', '998-778-6523', 'profilephoto/10005.jpg'),
(10006, 'provider', 'mark_wang', '123', 'Mark Wang', 'mark.wang@workmail.com', '555-123-7890', 'profilephoto/10006.jpg'),
(10007, 'adopter', 'emily_chan', '123', 'Emily Chan', 'emily.chan@workmail.com', '222-333-4444', 'profilephoto/10007.jpg'),
(10008, 'adopter', 'tom_huang', '123', 'Tom Huang', 'tom.huang@workmail.com', '666-777-8888', 'profilephoto/10008.jpg'),
(10009, 'adopter', 'lucy_kim', '123', 'Lucy Kim', 'lucy.kim@example.com', '424-553-6866', 'profilephoto/10009.jpg'),
(10010, 'adopter', 'jone_yang', '123', 'Jone Yang', 'john.yang@workmail.com', '778-062-2451', 'profilephoto/10010.jpg'),
(10011, 'provider', 'mary_smith', '123', 'Mary Smith', 'mary.smith@workmail.com', '798-260-2377', 'profilephoto/10011.jpg'),
(10012, 'provider', 'james_wilson', '123', 'James Wilson', 'james.wilson@workmail.com', '236-887-1116', 'profilephoto/10012.jpg'),
(10013, 'adopter', 'sarah_jones', '123', 'Sarah Jones', 'sarah.jones@workmail.com', 'pass1998', 'profilephoto/10013.jpg'),
(10014, 'adopter', 'robert_brown', '123', 'Robert Brown', 'robert.brown@workmail.com', '236-562-7388', 'profilephoto/10014.jpg'),
(10015, 'adopter', 'linda_taylor', '123', 'Linda Taylor', 'linda.taylor@workmail.com', '798-181-2233', 'profilephoto/10015.jpg'),
(10016, 'provider', 'Dannie', '$2y$10$7nOYA.RcX5o8S18a62sKcOH2fo2i3U9I5swZbxajZ3au6QDDaLpGe', 'Danni Chen', 'dca158@sfu.ca', '7789981116', '../../profilephoto/Dannie_95.jpg'),
(10017, 'adopter', 'Angus', '$2y$10$qY4yfZ6lXGizFB8r3NUYBehJoZmjmcIjGRT4RA8iGIktQOhbuCQbO', 'Zekun Wang', 'zekun@sfu.ca', '7789983821', '../../profilephoto/Angus_8.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adoption_records`
--
ALTER TABLE `adoption_records`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pet_id` (`pet_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pet_id` (`pet_id`);

--
-- Indexes for table `pet`
--
ALTER TABLE `pet`
  ADD PRIMARY KEY (`pet_id`);

--
-- Indexes for table `pet_images`
--
ALTER TABLE `pet_images`
  ADD UNIQUE KEY `idx_pet_id_image` (`pet_id`,`images`);

--
-- Indexes for table `pet_tags`
--
ALTER TABLE `pet_tags`
  ADD KEY `pet_id` (`pet_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `preferences`
--
ALTER TABLE `preferences`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `provide_records`
--
ALTER TABLE `provide_records`
  ADD PRIMARY KEY (`pet_id`,`user_id`),
  ADD KEY `pet_id` (`pet_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pet`
--
ALTER TABLE `pet`
  MODIFY `pet_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10052;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10018;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adoption_records`
--
ALTER TABLE `adoption_records`
  ADD CONSTRAINT `adoption_records_ibfk_1` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`),
  ADD CONSTRAINT `adoption_records_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `pet_images`
--
ALTER TABLE `pet_images`
  ADD CONSTRAINT `pet_images_ibfk_1` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`);

--
-- Constraints for table `pet_tags`
--
ALTER TABLE `pet_tags`
  ADD CONSTRAINT `pet_tags_ibfk_1` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`),
  ADD CONSTRAINT `pet_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`);

--
-- Constraints for table `preferences`
--
ALTER TABLE `preferences`
  ADD CONSTRAINT `preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `preferences_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`);

--
-- Constraints for table `provide_records`
--
ALTER TABLE `provide_records`
  ADD CONSTRAINT `provide_records_ibfk_1` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`),
  ADD CONSTRAINT `provide_records_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
