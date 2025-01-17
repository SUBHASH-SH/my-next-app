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
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
  waitForConnections: true, // Wait for a connection to be available before throwing an error
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // Maximum number of queued connection requests (0 means no limit)
})

pool.getConnection()
  .then(connection => {
    console.log('Database connection established');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

export default pool;