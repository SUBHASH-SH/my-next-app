// lib/posts.js
import pool from './db';

// Fetch all blog posts
export async function getPosts() {
  const [rows] = await pool.query('SELECT * FROM job');
  return rows;
}

// Fetch a single blog post by slug
export async function getPostBySlug(did: string) {
  const [rows] = await pool.query('SELECT * FROM job WHERE id = ?', [did]);
  const job = JSON.parse(JSON.stringify(rows))[0];
  return job;
}