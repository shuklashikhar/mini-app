
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


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    in_price NUMERIC NOT NULL,
    price NUMERIC NOT NULL,
    vat NUMERIC NOT NULL,
    unit TEXT NOT NULL
);
