CREATE TABLE user (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  wishlist TEXT,
  preferences TEXT,
  profile_image TEXT,
  FOREIGN KEY (wishlist) REFERENCES post (id)
  FOREIGN KEY (preferences) REFERENCES tags (tag)
);

CREATE TABLE tags (
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT
  PRIMARY KEY (id, name)
);

CREATE TABLE games (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  rating REAL NOT NULL,
  released DATE NOT NULL,
  price REAL NOT NULL,
  background_image TEXT,
  tags TEXT,
  platforms TEXT,
  developer TEXT NOT NULL

    FOREIGN KEY (tags) REFERENCES tags (id)
    
);

