// lib/posts.js
import pool from './db';

// Fetch all Jobs posts
export async function getJobPosts() {
  const [rows] = await pool.query('SELECT * FROM job');
  return rows;
}

// Fetch a single blog post by slug
export async function getJobPostBySlug(jid: string) {
  const [rows] = await pool.query('SELECT * FROM job WHERE id = ?', [jid]);
  const job = JSON.parse(JSON.stringify(rows))[0];
  return job;
}

// Fetch Result posts
export async function getAdmitPosts() {
  const [rows] = await pool.query('SELECT * FROM job');
  return rows;
}

// Fetch a single result post by slug
export async function getAdmitBySlug(aid: string) {
  const [rows] = await pool.query('SELECT * FROM job WHERE id = ?', [aid]);
  const job = JSON.parse(JSON.stringify(rows))[0];
  return job;
}

// Fetch Result posts
export async function getResultPosts() {
  const [rows] = await pool.query('SELECT * FROM job');
  return rows;
}

// Fetch a single result post by slug
export async function getJobResultBySlug(rid: string) {
  const [rows] = await pool.query('SELECT * FROM job WHERE id = ?', [rid]);
  const job = JSON.parse(JSON.stringify(rows))[0];
  return job;
}

// Fetch News posts
export async function getNewsPosts() {
  const [rows] = await pool.query('SELECT * FROM job');
  return rows;
}

// Fetch a single result post by slug
export async function getNewsBySlug(nid: string) {
  const [rows] = await pool.query('SELECT * FROM job WHERE id = ?', [nid]);
  const job = JSON.parse(JSON.stringify(rows))[0];
  return job;
}

// Fetch News posts
export async function getAnswerPosts() {
  const [rows] = await pool.query('SELECT * FROM job');
  return rows;
}

// Fetch a single result post by slug
export async function getAnswerBySlug(anid: string) {
  const [rows] = await pool.query('SELECT * FROM job WHERE id = ?', [anid]);
  const job = JSON.parse(JSON.stringify(rows))[0];
  return job;
}

// Fetch News posts
export async function getSyllabusPosts() {
  const [rows] = await pool.query('SELECT * FROM job');
  return rows;
}

// Fetch a single result post by slug
export async function getSallabusBySlug(sid: string) {
  const [rows] = await pool.query('SELECT * FROM job WHERE id = ?', [sid]);
  const job = JSON.parse(JSON.stringify(rows))[0];
  return job;
}

// Fetch News posts
export async function getDatePosts() {
  const [rows] = await pool.query('SELECT * FROM job');
  return rows;
}

// Fetch a single result post by slug
export async function getDateBySlug(did: string) {
  const [rows] = await pool.query('SELECT * FROM job WHERE id = ?', [did]);
  const job = JSON.parse(JSON.stringify(rows))[0];
  return job;
}



