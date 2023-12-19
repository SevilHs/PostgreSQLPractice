const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: "instagram",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get("/", async (req, res) => {
  const page = req.query.page;
  const totalUsers = await pool.query(
    "SELECT COUNT(id) as total_users FROM users"
  );
  const limit = 10;
  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(totalUsers.rows[0].total_users / limit);

  pool.query(
    `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ users: result.rows, totalPages });
      }
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} is runing`);
});
