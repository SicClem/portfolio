CREATE DATABASE portfolio_db;

USE portfolio_db;

CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NULL,
    `linkedin` VARCHAR(100) NULL,
    `github` VARCHAR(100) NULL,
    `resume` TEXT NULL,
    `techskill` TEXT NULL,
    `language` TEXT NULL,
    `softskill` TEXT NULL,
    `role` VARCHAR(100) NOT NULL,
    `photo` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `pro_experience` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `job_title` VARCHAR(255) NOT NULL,
    `start_date` DATETIME NULL,
    `end_date` DATETIME NULL,
    `company` TEXT NULL,
    `description` TEXT NULL,
    `user_id` INT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
    PRIMARY KEY (`id`)
);

CREATE TABLE `trainings` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `school` VARCHAR(255)  NOT NULL,
    `user_id` INT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
    PRIMARY KEY (`id`)
);

CREATE TABLE `project` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255)  NOT NULL,
    `link` VARCHAR(255)  NOT NULL,
    `description` VARCHAR(255)  NOT NULL,
    `user_id` INT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
    PRIMARY KEY (`id`)
);

INSERT INTO user (name, firstname, email, city, linkedin, github, resume, techskill, language, softskill, role, photo, password) VALUES 
('Siché', 'Clément', 'clement.siche@gmail.com', 'Lyon', 'https://www.linkedin.com/in/cl%C3%A9ment-s-b2766018b/', 'https://github.com/BlackHighSheep', 
"Une initiation à l'arduino m'a permis de réaliser mon attrait pour le développement, ce qui m'a poussé à entreprendre la formation de développeur au sein de la Wild Code School.",
"Angular8, NodeJS, GIT-GitHub, HTML5/CSS3/JSvanilla, Bootstrap, mySQL, Méthodes Agiles/SCRUM", 'anglais', 'Persévérant, Organisé, Jovial', 'admin', 'CS_profilPicture.png', '$argon2i$v=19$m=4096,t=3,p=1$gwDQTupI91TXmOs32Gnasw$wggmzxjIAB18TFGC9gZBD7WYbLUEeDKdWTOszwJZLJ0');

INSERT INTO trainings (title, school, user_id) VALUES
('Développeur web junior Angular8 / NodeJS', 'Wild Code School', 1),
('Diplome Supérieur de Comptabilité et de Gestion (DSCG)', 'ORT LYON', 1),
('Diplome de Comptabilité et de Gestion (DCG)', 'IAE Lyon III', 1);

INSERT INTO project ( title, image, link, description, user_id) VALUES
('Bambino', 'Bambino.jpeg', '', 'Premier projet client, réalisé sous angular.', 1),
('South-Park Memory', 'Memory.png', 'https://pn-th.github.io/memory-project/', 'Premier projet utilisant du JS. Réalisé avec H.P, T.P, A.T, I.K.', 1), 
('ShootThemUp', 'ShootThemUp.png', 'https://zombienation-3zosbrk1f.now.sh/', "Projet sous Angular lors d'un hackathon de 24h. Réalisé avec H.P, A.N, T.P, R.M", 1),
('Eldebaran3000', 'Eldebaran.png', 'https://projet3-eldebaran3000-dn8w7teb5.now.sh/',"Premier projet effectué sur Angular, il s'agit d'une version revisité de SimCity. Réalisé avec I.K, A.N et A.P",1);

INSERT INTO pro_experience (job_title, start_date, end_date, company, description, user_id) VALUES 
('Web développeur', '2019-09-01 00:00:00', '2020-02-06 00:00:00', 'Wild Code School', '', 1),
('Collaborateur Comptable / Auditeur Financier',  '2013-10-01 00:00:00', '2019-07-01 00:00:00', 'ACKELA CONSEIL / MV AUDIT / R. OHAYON & ASSOCIÉS, COGESTEAM','', 1);