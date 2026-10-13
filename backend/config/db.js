require("dotenv").config();

const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

let sslConfig;

if (process.env.DB_CA_CERT) {
  // Online deployment: CA certificate from environment variable
  sslConfig = {
    ca: process.env.DB_CA_CERT.replace(/\\n/g, "\n"),
    rejectUnauthorized: true,
  };
} else {
  // Local development: CA certificate file
  const caPath = path.join(__dirname, "../certs/ca.pem");

  sslConfig = {
    ca: fs.readFileSync(caPath, "utf8"),
    rejectUnauthorized: true,
  };
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: sslConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
