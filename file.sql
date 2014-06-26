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
	opt_out BOOLEAN,
	university TEXT,
	department TEXT
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


CREATE TABLE IF NOT EXISTS revisions (
        id serial PRIMARY KEY,
        book_id INT REFERENCES books(id) ON DELETE CASCADE NOT NULL,
	revision_book_id INT REFERENCES books(id) ON DELETE CASCADE NOT NULL,
	created DATE
);

CREATE INDEX revisions_created_idx ON revisions(created);
CREATE INDEX revisions_book_id_idx ON revisions(book_id);


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
        id SERIAL PRIMARY KEY,
        recipient INT REFERENCES users(id) ON DELETE CASCADE,
        referenced_book INT REFERENCES books(id) ON DELETE CASCADE NOT NULL,
        sender INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        date_sent TIMESTAMP WITH TIME ZONE NOT NULL,
        accepted BOOLEAN default false
);
CREATE INDEX book_notif_sender_idx ON book_notifications(recipient,sender,referenced_book);


CREATE TABLE IF NOT EXISTS comment_notifications (
        id SERIAL PRIMARY KEY,
        commenter INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        referenced_book INT REFERENCES books(id) ON DELETE CASCADE NOT NULL
);
CREATE INDEX comment_notif_idx ON comment_notifications(referenced_book,commenter);

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

