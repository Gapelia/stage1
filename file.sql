CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        name TEXT,
        email TEXT,
        fullname TEXT,
        dob DATE,
        gender VARCHAR(1),
        location TEXT,
        avatar_image TEXT,
        cover_image TEXT,
        display_name TEXT,
        validate_id TEXT,
        provider_id TEXT,
        member_since TIMESTAMP WITH TIME ZONE,
        last_login TIMESTAMP WITH TIME ZONE,
        last_updated TIMESTAMP WITH TIME ZONE,
        personal_website TEXT,
        bio TEXT,
        tags TEXT,
        fb TEXT,
        gp TEXT,
        twt TEXT,
        is_public BOOLEAN
);
CREATE INDEX user_validate_id_idx ON users(validate_id);

CREATE TABLE IF NOT EXISTS books (
        id serial PRIMARY KEY,
        cover_photo TEXT,
        title TEXT,
        language VARCHAR(2),
        tags TEXT[],
        owned_by INT REFERENCES users(id) NOT NULL,
        created TIMESTAMP WITH TIME ZONE,
        last_updated TIMESTAMP WITH TIME ZONE,
        is_published BOOLEAN default false
);
CREATE INDEX book_owned_by_idx ON books(owned_by);

CREATE TABLE IF NOT EXISTS user_votes (
        user_id INT PRIMARY KEY REFERENCES users(id),
        book_id INT REFERENCES books(id) NOT NULL
);
CREATE INDEX user_votes_book_id_idx ON user_votes(book_id);

CREATE TABLE IF NOT EXISTS user_subscriptions (
        user_id INT PRIMARY KEY REFERENCES users(id),
        book_id INT REFERENCES books(id) NOT NULL
);
CREATE INDEX user_subscriptions_book_id_idx ON user_subscriptions(book_id);

CREATE TABLE IF NOT EXISTS user_bookmarks (
        user_id INT PRIMARY KEY REFERENCES users(id),
        book_id INT REFERENCES books(id) NOT NULL
);
CREATE INDEX user_bookmarks_book_id_idx ON user_bookmarks(book_id);


CREATE TABLE IF NOT EXISTS pages (
        id serial PRIMARY KEY,
        title TEXT,
        content TEXT,
        template_id INT,
        video_url TEXT,
        book_id INT REFERENCES books(id) NOT NULL,
        page_number INT,
        user_id  INT REFERENCES users(id) NOT NULL,
        photo_url TEXT,
        photo_id TEXT,
        creative_commons TEXT,
        created TIMESTAMP WITH TIME ZONE,
        last_updated TIMESTAMP WITH TIME ZONE
);
CREATE INDEX page_book_id_idx ON pages(book_id);
CREATE INDEX page_user_id_idx ON pages(user_id);

CREATE TABLE IF NOT EXISTS book_notifications (
        recipient INT PRIMARY KEY REFERENCES users(id),
        referenced_book INT REFERENCES books(id) NOT NULL,
        sender INT REFERENCES users(id) NOT NULL,
        date_sent TIMESTAMP WITH TIME ZONE NOT NULL,
        accepted BOOLEAN default false
);
CREATE INDEX book_notif_sender_idx ON book_notifications(sender);

CREATE TABLE IF NOT EXISTS libraries(
        id serial PRIMARY KEY,
        created_by INT REFERENCES users(id) NOT NULL,
        title TEXT NOT NULL,
        tags TEXT,
        cover_photo TEXT,
        description TEXT,
        num_subscribers INT default 0,
        featured_book INT REFERENCES books(id) NOT NULL,
        created TIMESTAMP WITH TIME ZONE
);
CREATE INDEX library_created_by_idx ON libraries(created_by);

CREATE TABLE IF NOT EXISTS library_books (
        library_id INT PRIMARY KEY REFERENCES libraries(id),
        book_id INT REFERENCES books(id) NOT NULL
);
CREATE INDEX library_books_book_id_idx ON library_books(book_id);

CREATE TABLE IF NOT EXISTS contributors (
        user_id INT PRIMARY KEY REFERENCES users(id),
        book_id INT REFERENCES books(id) NOT NULL
);
CREATE INDEX contributors_book_id_idx ON contributors(book_id);

CREATE TABLE IF NOT EXISTS editors (
        editor_id INT PRIMARY KEY REFERENCES users(id),
        book_id INT REFERENCES books(id) NOT NULL
);
CREATE INDEX editors_book_id_idx ON editors(book_id);

CREATE TABLE IF NOT EXISTS library_notifications (
        recipient INT PRIMARY KEY REFERENCES users(id),
        referenced_library INT REFERENCES libraries(id) NOT NULL,
        sender INT REFERENCES users(id) NOT NULL,
        book_id INT REFERENCES books(id) NOT NULL,
        date_sent TIMESTAMP WITH TIME ZONE NOT NULL,
        accepted BOOLEAN
);
CREATE INDEX lib_notif_sender_idx ON library_notifications(sender);
