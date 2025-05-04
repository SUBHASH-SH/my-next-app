// lib/db.ts
import pg from 'pg';

// Create a new Pool instance
const pool = new pg.Pool({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
  //port: Number(process.env.db_port),
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection to be established
});

// Test the connection
pool.query('SELECT NOW()')
  .then(() => {
    console.log('Database connection established');
  })
  .catch((err: Error) => {
    console.error('Error connecting to the database:', err);
  });

export default pool;