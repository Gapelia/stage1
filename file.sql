DROP TABLE IF EXISTS books, users, libraries, pages;

CREATE TABLE IF NOT EXISTS users (
	id serial PRIMARY KEY,
	email VARCHAR(100),
	fullName VARCHAR(100),
	dob VARCHAR(100),
	gender VARCHAR(100),
	location VARCHAR(100),
	image VARCHAR(1000),
	displayName VARCHAR(100),
	validateId VARCHAR(100),
	providerId VARCHAR(100),
	name VARCHAR(100),
	bio VARCHAR(1000),
	tags VARCHAR(256)
);
CREATE TABLE IF NOT EXISTS libraries(
	id serial PRIMARY KEY,
	editor VARCHAR(100),
	tags VARCHAR(100),
	coverPhoto VARCHAR(256),
	description VARCHAR(256),
	numberOfBooks INT,
	numberOfContributors INT
);
CREATE TABLE IF NOT EXISTS books ( 
	id serial PRIMARY KEY, 
	bookId VARCHAR(100), 
	title VARCHAR(100),
	language VARCHAR(100),
	libraryId INT references libraries(id),
	tags VARCHAR(100),
	userId  INT references users(id),
	isPublished INT
);
CREATE TABLE IF NOT EXISTS pages (
	id serial PRIMARY KEY,
	title VARCHAR(100),
	description VARCHAR(10000),
	location VARCHAR(1000),
	templateId INT,
	bookId VARCHAR(100),
	marginX VARCHAR(100),
	marginY VARCHAR(100),
	videoUrl VARCHAR(256),
	pageNumber INT,
	userId INT references users(id),
	photoUrl VARCHAR(256),
	photoId VARCHAR(100)
);

INSERT INTO users (id, email,fullName,dob,gender,location,image, displayName,ValidateId,ProviderId,name,bio,tags) VALUES (1,'dfcf93@hotmail.com','Erasmus','0/0/0000','M','Olympus','http://static2.wikia.nocookie.net/__cb20071215210061/dune/images/c/ce/Cymek.jpg','Ominus',1,1,'GOD','Erasmus became trapped in an ice crevice during a solo expedition on Corrin, and remained there for twenty years. During that time, and without the guidance of Omnius or the company of other beings, he spent vast amounts of time ruminating on various philosophical concepts.','DUNE');
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (1,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'Into the Wild', 'People, nature, freedom and the stories in between', 0, 0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (2,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'The Fashionista', 'The intersection of fashion, style and self-expression', 0, 0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (3,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg','The Farmhouse', 'Food, planet, values', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (4,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'Architecture', 'Design, building and beauty around us', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (5,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'The Dali Collective', 'All stories visual', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (6,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'Thought-provoking', 'Innovation distinguishes between a leader and a follower', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (7,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'The Historian', 'The documented truth around us', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (8,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'Comedy Studio', 'Sense of humor', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (9,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'Abbey Road', 'Without music, life would be an error', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (10,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'Inventions of Tomorrow', 'Great products that exist or should exist', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (11,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'Dead Poets Society', 'No matter what anybody tells you, words and ideas can change the world', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (12,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'Guidebooks', 'Continents, countries, cities, neighborhoods', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (13,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'Villages', 'With a sense of legacy, roots, and tradition', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (14,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'The Tribute Journal', 'Stay hungry, stay foolish', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (15,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'On the Road', 'Nothing behind me, everything ahead of me',0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (16,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'Subculture', 'The underground identity', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (17,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'Design, Tech and beyond', 'Humans and tech, together', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (18,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'Modernism', 'a style of art, architecture, literature, etc., that uses ideas and methods which are very different from those used in the past', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (19,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'Museum', 'Objects of scientific, artistic, cultural, or historical importance', 0,0);
INSERT INTO libraries (id,editor,tags,coverPhoto,description,numberOfBooks,numberOfContributors) VALUES (20,1,'http://gapelia-dev.herokuapp.com/static/images/book-thumb-01.jpg', 'Metabook', 'Re-imagining the future of books', 0,0); 