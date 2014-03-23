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
        display_name TEXT,
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
        is_public BOOLEAN
);
CREATE INDEX user_validated_id_idx ON users(validated_id);

CREATE TABLE IF NOT EXISTS books (
        id serial PRIMARY KEY,
        owned_by INT REFERENCES users(id) NOT NULL,
        cover_photo TEXT,
        title TEXT,
        language VARCHAR(2),
        tags TEXT,
        created TIMESTAMP WITH TIME ZONE,
        last_updated TIMESTAMP WITH TIME ZONE,
        is_published BOOLEAN default false
);
CREATE INDEX book_owned_by_idx ON books(owned_by);

CREATE TABLE IF NOT EXISTS pages (
        id serial PRIMARY KEY,
        book_id INT REFERENCES books(id) NOT NULL,
        user_id  INT REFERENCES users(id) NOT NULL,
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
        created_by INT REFERENCES users(id) NOT NULL,
        title TEXT NOT NULL,
        tags TEXT,
        cover_photo TEXT,
        description TEXT,
        featured_book INT REFERENCES books(id),
        created TIMESTAMP WITH TIME ZONE
);

INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Architecture', '/static/images/covers/architecture-sonn-visionsofart.jpg', 'Architecture is both the process and product of planning, designing, and construction, usually of buildings and other physical structures.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Biography', '/static/images/covers/biography-dieterrams.jpg', 'A biography or simply bio is a detailed description or account of a person''s life. It entails more than basic facts.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Cinema', '/static/images/covers/cinema-matrix.jpg', 'Filmmaking takes place in many places around the world in a range of contexts, and using a variety of technologies and cinematic techniques.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Cuisine', '/static/images/covers/biography-dieterrams.jpg', 'Cuisine is a characteristic style of cooking practices and traditions, often associated with a specific culture.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Era', '/static/images/covers/biography-dieterrams.jpg', 'An era is a period of time marked by distinctive character, events, &c.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'The Far East', '/static/images/covers/biography-dieterrams.jpg', 'The term evokes cultural as well as geographic separation; the Far East is not just geographically distant, but also culturally exotic.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Fashionista', '/static/images/covers/biography-dieterrams.jpg', 'A person who creates or promotes high fashion, i.e. a fashion designer or fashion editor, + who dresses according to the trends of fashion.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Future', '/static/images/covers/biography-dieterrams.jpg', 'The future is the indefinite time period after the present. Its arrival is considered inevitable due to the existence of time + the physics.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Gapelians', '/static/images/covers/biography-dieterrams.jpg', 'A biography or simply bio is a detailed description or account of a person''s life. It entails more than basic facts.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Historians', '/static/images/covers/biography-dieterrams.jpg', 'Historians are concerned with the continuous, methodical narrative and research of past events as relating to the human race.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Into The Wild', '/static/images/covers/biography-dieterrams.jpg', 'The Age of Discovery (a/k/a the Age of Exploration) was a period starting in the early 15th century and continuing to the 17th century.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Japanimation', '/static/images/covers/biography-dieterrams.jpg', 'Anime are Japanese animated productions featuring hand-drawn art or CGI. For simplicity, many view anime as an animation product from Japan.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Land Of Kawaii', '/static/images/covers/biography-dieterrams.jpg', 'Kawaii is the quality of cuteness in the context of Japanese culture.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Manifesto', '/static/images/covers/biography-dieterrams.jpg', 'A manifesto is a published verbal declaration of the intentions, motives, or views of the issuer, be it an individual, group, or government.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Modernism', '/static/images/covers/biography-dieterrams.jpg', 'Modernism encompasses the activities and output of those who felt the "traditional" forms of art were becoming outdated in the world.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Mother Gaea', '/static/images/covers/biography-dieterrams.jpg', 'Gaia was the great mother of all: the primal Greek Mother Goddess; creator and giver of birth to the Earth and all the Universe.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Museum', '/static/images/covers/biography-dieterrams.jpg', 'A museum is an institution that cares for artifacts and other objects of scientific, artistic, cultural, or historical importance.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'On the Road ', '/static/images/covers/biography-dieterrams.jpg', 'Today, modern road tripping is a fast growing hobby, and not just a means of vacationing.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Products of Tomorrow', '/static/images/covers/biography-dieterrams.jpg', 'Cyberpunk features advanced science, such as information technology and cybernetics, coupled with a degree of breakdown or radical change.', '2014-03-22 00:10:07.005+00' );
INSERT INTO libraries (created_by, title, cover_photo, description, created) VALUES('22', 'Subculture', '/static/images/covers/biography-dieterrams.jpg', 'In sociology + cultural studies, a subculture is a group of people within a culture that differentiates themselves from the larger culture.', '2014-03-22 00:10:07.005+00' );

CREATE INDEX library_created_by_idx ON libraries(created_by);

CREATE TABLE IF NOT EXISTS user_votes (
        user_id INT PRIMARY KEY REFERENCES users(id),
        book_id INT REFERENCES books(id) NOT NULL
);
CREATE INDEX user_votes_book_id_idx ON user_votes(book_id);

CREATE TABLE IF NOT EXISTS user_bookmarks (
        user_id INT PRIMARY KEY REFERENCES users(id),
        book_id INT REFERENCES books(id) NOT NULL
);
CREATE INDEX user_bookmarks_book_id_idx ON user_bookmarks(book_id);

CREATE TABLE IF NOT EXISTS book_notifications (
        recipient INT PRIMARY KEY REFERENCES users(id),
        referenced_book INT REFERENCES books(id) NOT NULL,
        sender INT REFERENCES users(id) NOT NULL,
        date_sent TIMESTAMP WITH TIME ZONE NOT NULL,
        accepted BOOLEAN default false
);
CREATE INDEX book_notif_sender_idx ON book_notifications(sender);

CREATE TABLE IF NOT EXISTS library_notifications (
        recipient INT PRIMARY KEY REFERENCES users(id),
        referenced_library INT REFERENCES libraries(id) NOT NULL,
        sender INT REFERENCES users(id) NOT NULL,
        book_id INT REFERENCES books(id) NOT NULL,
        date_sent TIMESTAMP WITH TIME ZONE NOT NULL,
        accepted BOOLEAN
);
CREATE INDEX lib_notif_sender_idx ON library_notifications(sender);

CREATE TABLE IF NOT EXISTS library_books (
        library_id INT PRIMARY KEY REFERENCES libraries(id),
        book_id INT REFERENCES books(id) NOT NULL
);
CREATE INDEX library_books_book_id_idx ON library_books(book_id);

CREATE TABLE IF NOT EXISTS contributors (
        user_id INT PRIMARY KEY REFERENCES users(id),
        library_id INT REFERENCES libraries(id)
);
CREATE INDEX contributors_book_id_idx ON contributors(library_id);

CREATE TABLE IF NOT EXISTS editors (
        editor_id INT PRIMARY KEY REFERENCES users(id),
        library_id INT REFERENCES libraries(id)
);
CREATE INDEX editors_book_id_idx ON editors(library_id);

CREATE TABLE IF NOT EXISTS user_subscriptions (
        user_id INT PRIMARY KEY REFERENCES users(id),
        library_id INT REFERENCES libraries(id)
);
CREATE INDEX user_subscriptions_id_idx ON user_subscriptions(library_id);