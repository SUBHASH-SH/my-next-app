// lib/db.ts
import mysql from 'mysql2/promise';

/*
let connection: mysql.Connection;
export const createConnection = async () => {
    if(!connection) { 
        connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        })
    }
    return connection;
}*/


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool;