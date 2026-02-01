
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE translations (
    id SERIAL PRIMARY KEY,
    key TEXT NOT NULL,
    language VARCHAR(2) NOT NULL,
    value TEXT NOT NULL,
    CONSTRAINT unique_key_language UNIQUE (key, language)
);




CREATE TABLE pricelist (
  id SERIAL PRIMARY KEY,
  article_no TEXT NOT NULL,
  product_name TEXT NOT NULL,
  in_price NUMERIC(10,2),
  price NUMERIC(10,2),
  unit TEXT,
  in_stock INTEGER,
  description TEXT,
  active BOOLEAN DEFAULT true
);
