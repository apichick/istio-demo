CREATE DATABASE movietheatre;
USE movietheatre;

CREATE TABLE movies (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(256) NOT NULL,
    release_date DATE NOT NULL,
    language CHAR(5) NOT NULL,
    runtime INT NOT NULL,
    story_line TEXT not NULL
);

CREATE TABLE directors (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(256) NOT NULL
);

CREATE TABLE actors (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(256) NOT NULL
);

CREATE TABLE cast (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    actor_id INT NOT NULL,
    movie_id INT NOT NULL
);

INSERT INTO movies (title, release_date, language, runtime, story_line) VALUES ("The Sting", "en_US", "1973-12-26", 129, "Following the murder of a mutual friend, aspiring con man Johnny Hooker (Robert Redford) teams up with old pro Henry Gondorff (Paul Newman) to take revenge on the ruthless crime boss responsible, Doyle Lonnegan (Robert Shaw). Hooker and Gondorff set about implementing an elaborate scheme, one so crafty that Lonnegan won't even know he's been swindled. As their big con unfolds, however, things don't go according to plan, requiring some last-minute improvisation by the undaunted duo");