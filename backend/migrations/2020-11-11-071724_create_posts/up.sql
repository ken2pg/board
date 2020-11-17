-- Your SQL goes here
CREATE TABLE IF NOT EXISTS posts(
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
        name TEXT NOT NULL,
        body TEXT NOT NULL,
        email TEXT,
        hobby TEXT
) 