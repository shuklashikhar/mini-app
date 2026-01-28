import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234", 
  database: "mini_pricelist",
  port: 5432,
});

export const query = (text, params) => {
  return pool.query(text, params);
};
