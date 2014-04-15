CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        name TEXT,
        email TEXT,
        full_name TEXT,
        dob DATE,
        gender VARCHAR(1),
        location TEXT,
        avatar_image TEXT,
        cover_image TEXT,
        display_name TEXT UNIQUE,
        validated_id TEXT,
        provider_id TEXT,
        personal_website TEXT,
        bio TEXT,
        tags TEXT,
        fb TEXT,
        gp TEXT,
        twt TEXT,
        member_since TIMESTAMP WITH TIME ZONE,
        last_login TIMESTAMP WITH TIME ZONE,
        last_updated TIMESTAMP WITH TIME ZONE,
        is_public BOOLEAN,
        is_onboarded BOOLEAN,
	library_creator BOOLEAN,
	opt_out BOOLEAN
);

CREATE INDEX user_validated_id_idx ON users(validated_id);

CREATE TABLE IF NOT EXISTS books (
        id serial PRIMARY KEY,
        owned_by INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        cover_photo TEXT,
        title TEXT,
        language VARCHAR(2),
        tags TEXT,
        created TIMESTAMP WITH TIME ZONE,
        last_updated TIMESTAMP WITH TIME ZONE,
        is_published BOOLEAN default false,
	snippet	TEXT
);
CREATE INDEX book_owned_by_idx ON books(owned_by);

CREATE TABLE IF NOT EXISTS pages (
        id serial PRIMARY KEY,
        book_id INT REFERENCES books(id) ON DELETE CASCADE NOT NULL,
        user_id  INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        page_number INT,
        template_id INT,
        title TEXT,
        content TEXT,
        video_url TEXT,
        photo_url TEXT,
        photo_id TEXT,
        creative_commons TEXT,
        created TIMESTAMP WITH TIME ZONE,
        last_updated TIMESTAMP WITH TIME ZONE
);
CREATE INDEX page_book_id_idx ON pages(book_id);
CREATE INDEX page_user_id_idx ON pages(user_id);

CREATE TABLE IF NOT EXISTS libraries(
        id serial PRIMARY KEY,
        created_by INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        title TEXT NOT NULL,
        tags TEXT,
        cover_photo TEXT,
        description TEXT,
        featured_book INT REFERENCES books(id) ON DELETE CASCADE,
        created TIMESTAMP WITH TIME ZONE
);


INSERT INTO users (id,name) VALUES (1,'god');

--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Architecture', '/static/images/libraries/Architecture.jpg', 'Architecture is both the process and product of planning, designing, and construction, usually of buildings and other physical structures.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Biography', '/static/images/covers/biography-dieterrams.jpg', 'A biography or simply bio is a detailed description or account of a person''s life. It entails more than basic facts.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Cinema', '/static/images/covers/cinema-matrix.jpg', 'Filmmaking takes place in many places around the world in a range of contexts, and using a variety of technologies and cinematic techniques.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Cuisine', '/static/images/covers/cuisine-traceysculinaryadventures.jpg', 'Cuisine is a characteristic style of cooking practices and traditions, often associated with a specific culture.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Era', '/static/images/covers/era-akasped.jpg', 'An era is a period of time marked by distinctive character, events, &c.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'The Far East', '/static/images/libraries/', 'The term evokes cultural as well as geographic separation; the Far East is not just geographically distant, but also culturally exotic.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Fashionista', '/static/images/covers/biography-dieterrams.jpg', 'A person who creates or promotes high fashion, i.e. a fashion designer or fashion editor, + who dresses according to the trends of fashion.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Future', '/static/images/covers/biography-dieterrams.jpg', 'The future is the indefinite time period after the present. Its arrival is considered inevitable due to the existence of time + the physics.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Gapelians', '/static/images/covers/biography-dieterrams.jpg', 'A biography or simply bio is a detailed description or account of a person''s life. It entails more than basic facts.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Historians', '/static/images/covers/biography-dieterrams.jpg', 'Historians are concerned with the continuous, methodical narrative and research of past events as relating to the human race.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Into The Wild', '/static/images/covers/biography-dieterrams.jpg', 'The Age of Discovery (a/k/a the Age of Exploration) was a period starting in the early 15th century and continuing to the 17th century.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Japanimation', '/static/images/covers/biography-dieterrams.jpg', 'Anime are Japanese animated productions featuring hand-drawn art or CGI. For simplicity, many view anime as an animation product from Japan.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Land Of Kawaii', '/static/images/covers/biography-dieterrams.jpg', 'Kawaii is the quality of cuteness in the context of Japanese culture.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Manifesto', '/static/images/covers/biography-dieterrams.jpg', 'A manifesto is a published verbal declaration of the intentions, motives, or views of the issuer, be it an individual, group, or government.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Modernism', '/static/images/covers/biography-dieterrams.jpg', 'Modernism encompasses the activities and output of those who felt the "traditional" forms of art were becoming outdated in the world.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Mother Gaea', '/static/images/covers/biography-dieterrams.jpg', 'Gaia was the great mother of all: the primal Greek Mother Goddess; creator and giver of birth to the Earth and all the Universe.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Museum', '/static/images/covers/biography-dieterrams.jpg', 'A museum is an institution that cares for artifacts and other objects of scientific, artistic, cultural, or historical importance.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'On the Road ', '/static/images/covers/biography-dieterrams.jpg', 'Today, modern road tripping is a fast growing hobby, and not just a means of vacationing.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Products of Tomorrow', '/static/images/covers/biography-dieterrams.jpg', 'Cyberpunk features advanced science, such as information technology and cybernetics, coupled with a degree of breakdown or radical change.', '2014-03-22 00:10:07.005+00' );
--INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Subculture', '/static/images/covers/biography-dieterrams.jpg', 'In sociology + cultural studies, a subculture is a group of people within a culture that differentiates themselves from the larger culture.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'INTO THE WILD', '/static/images/libraries/into-the-wild.jpg', 'People, nature, freedom and the stories in between.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'FASHIONISTA', '/static/images/libraries/the-fashionista.jpg', 'The intersection of fashion, style and self-expression.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'ON THE ROAD', '/static/images/libraries/on-the-road.jpg', '“Nothing behind, everything ahead of me”.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'VILLAGES', '/static/images/libraries/villages.jpg', 'With a sense of legacy, roots, and tradition.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'THE FARMHOUSE', '/static/images/libraries/the-farmhouse.jpg', 'Food, planet and values.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'ARCHITECTURE', '/static/images/libraries/Architecture.jpg', 'Design, building and beauty around us.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'CITY LIFE', '/static/images/libraries/Modernism.jpg', 'Urbanized, people, crossroads', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'GUIDEBOOKS', '/static/images/libraries/Guidebooks.jpg', 'Continents, countries, cities, neighborhoods.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'THE TRIBUTE JOURNAL', '/static/images/libraries/tribute-journal.jpg', 'Stay hungry, stay foolish.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'THE DALI COLLECTIVE', '/static/images/libraries/the-dali-collective.jpg', 'All stories visual.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'DEAD POETS SOCIETY', '/static/images/libraries/dead-poets-society.jpg', 'Manifestos, philosophy, statements on any topic', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'THE ATTIC', '/static/images/libraries/Meta-books.jpg', 'Treasures we keep, things we collect.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'SUBCULTURE', '/static/images/libraries/SubCulture.jpg', 'The underground identity', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'THOUGHT-PROVOKING', '/static/images/libraries/thought-provoking.jpg', 'Innovation distinguishes between a leader and a follower.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'THE HISTORIAN', '/static/images/libraries/the-historian.jpg', 'The documented truth around us.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'COMEDY STUDIO', '/static/images/libraries/comedy-studio.jpg', 'Sense of humor.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'FREEFALLING', '/static/images/libraries/Museum.jpg', 'Extreme action and sports.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'ABBEY ROAD', '/static/images/libraries/abbey-road.jpg', 'Without music, life would be an error.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'ALIVE!', '/static/images/libraries/wheat-field-by-phk-dan-10.jpg', 'The triumph of life, ideals and dreams.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'INVENTIONS OF TOMORROW', '/static/images/libraries/products-of-tomorrow.jpg', 'Great products that exist or should exist', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'DESIGN, TECH AND BEYOND.', '/static/images/libraries/design-tech-beyond.jpg', 'Tech and humans, together', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created)VALUES('1', 'GAPELIANS', '/static/images/libraries/design-tech-beyond.jpg', 'Dreamers', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Biography', '/static/images/covers/biography-dieterrams.jpg', 'A biography or simply bio is a detailed description or account of a person''s life. It entails more than basic facts.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Cinema', '/static/images/covers/cinema-matrix.jpg', 'Filmmaking takes place in many places around the world in a range of contexts, and using a variety of technologies and cinematic techniques.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Cuisine', '/static/images/covers/cuisine-traceysculinaryadventures.jpg', 'Cuisine is a characteristic style of cooking practices and traditions, often associated with a specific culture.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('1', 'Era', '/static/images/covers/era-akasped.jpg', 'An era is a period of time marked by distinctive character, events, &c.', '2014-03-22 00:10:07.005+00' );

CREATE INDEX library_created_by_idx ON libraries(created_by);

CREATE TABLE IF NOT EXISTS user_votes (
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        book_id INT REFERENCES books(id) ON DELETE CASCADE NOT NULL
);
CREATE UNIQUE INDEX user_votes_book_id_idx ON user_votes(user_id,book_id);

CREATE TABLE IF NOT EXISTS user_bookmarks (
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        book_id INT REFERENCES books(id) ON DELETE CASCADE NOT NULL
);
CREATE UNIQUE INDEX user_bookmarks_book_id_idx ON user_bookmarks(user_id,book_id);

CREATE TABLE IF NOT EXISTS book_notifications (
        recipient INT REFERENCES users(id) ON DELETE CASCADE,
        referenced_book INT REFERENCES books(id) ON DELETE CASCADE NOT NULL,
        sender INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        date_sent TIMESTAMP WITH TIME ZONE NOT NULL,
        accepted BOOLEAN default false
);
CREATE INDEX book_notif_sender_idx ON book_notifications(sender);

CREATE TABLE IF NOT EXISTS library_notifications (
	id SERIAL PRIMARY KEY,
        recipient INT REFERENCES users(id) ON DELETE CASCADE,
        referenced_library INT REFERENCES libraries(id) ON DELETE CASCADE NOT NULL,
        sender INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        book_id INT REFERENCES books(id) ON DELETE CASCADE NOT NULL,
        date_sent TIMESTAMP WITH TIME ZONE NOT NULL,
	accepted BOOLEAN default NULL,
	read BOOLEAN default false,
	message text default NULL
);
CREATE UNIQUE INDEX lib_notif_sender_idx ON library_notifications(recipient,sender,book_id,referenced_library);

CREATE TABLE IF NOT EXISTS library_books (
        library_id INT REFERENCES libraries(id) ON DELETE CASCADE,
        book_id INT REFERENCES books(id) ON DELETE CASCADE NOT NULL
);
CREATE UNIQUE INDEX library_books_book_id_idx ON library_books(library_id,book_id);

CREATE TABLE IF NOT EXISTS contributors (
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        library_id INT REFERENCES libraries(id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX contributors_book_id_idx ON contributors(user_id,library_id);

CREATE TABLE IF NOT EXISTS editors (
        editor_id INT REFERENCES users(id) ON DELETE CASCADE,
        library_id INT REFERENCES libraries(id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX editors_book_id_idx ON editors(editor_id,library_id);

CREATE TABLE IF NOT EXISTS user_subscriptions (
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        library_id INT REFERENCES libraries(id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX user_subscriptions_id_idx ON user_subscriptions(user_id,library_id);

CREATE TABLE IF NOT EXISTS user_friends (
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        is_following_id INT REFERENCES users(id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX user_friends_id_idx ON user_friends(user_id,is_following_id);


CREATE TABLE IF NOT EXISTS metric_book_views (
	book_id INT PRIMARY KEY REFERENCES books(id) ON DELETE CASCADE NOT NULL,
	views BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS metric_page_views (
	book_id INT REFERENCES books(id) ON DELETE CASCADE NOT NULL,
	page_num INT NOT NULL,
	views BIGINT NOT NULL DEFAULT 0
);
CREATE UNIQUE INDEX metric_page_views_idx ON metric_page_views(book_id,page_num);


CREATE TABLE IF NOT EXISTS metric_book_shares (
	book_id INT PRIMARY KEY REFERENCES books(id) ON DELETE CASCADE NOT NULL,
	fb int NOT NULL DEFAULT 0,
	twitter int NOT NULL DEFAULT 0,
	email int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS metric_user_book (
	user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
	book_id INT REFERENCES books(id) ON DELETE CASCADE NOT NULL,
	page_num INT DEFAULT 0,
	completed BOOLEAN DEFAULT false,
	voted BOOLEAN DEFAULT false
);
CREATE UNIQUE INDEX metric_read_status_idx ON metric_user_book(user_id,book_id);

CREATE TABLE IF NOT EXISTS metric_user_num_logins (
	user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
	login TIMESTAMP NOT NULL
);
CREATE INDEX metric_user_num_logins_idx ON metric_user_num_logins(user_id);

