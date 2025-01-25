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
  const [rows] = await pool.query('SELECT * FROM admit_card');
  return rows;
}

// Fetch a single result post by slug
export async function getAdmitBySlug(aid: string) {
  const [rows] = await pool.query('SELECT * FROM admit_card WHERE id = ?', [aid]);
  const job = JSON.parse(JSON.stringify(rows))[0];
  return job;
}

// Fetch Result posts
export async function getResultPosts() {
  const [rows] = await pool.query('SELECT * FROM result_details');
  return rows;
}

// Fetch a single result post by slug
export async function getResultBySlug(rid: string) {
  const [rows] = await pool.query('SELECT * FROM result_details WHERE id = ?', [rid]);
  const job = JSON.parse(JSON.stringify(rows))[0];
  return job;
}

// Fetch News posts
export async function getNewsPosts() {
  const [rows] = await pool.query('SELECT * FROM news');
  return rows;
}

// Fetch a single result post by slug
export async function getNewsBySlug(nid: string) {
  const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [nid]);
  const job = JSON.parse(JSON.stringify(rows))[0];
  return job;
}

// Fetch Answer posts
export async function getAnswerPosts() {
  const [rows] = await pool.query('SELECT * FROM answer');
  return rows;
}

// Fetch a single answer post by slug
export async function getAnswerBySlug(anid: string) {
  const [rows] = await pool.query('SELECT * FROM answer WHERE id = ?', [anid]);
  const job = JSON.parse(JSON.stringify(rows))[0];
  return job;
}

// Fetch syllabus posts
export async function getSyllabusPosts() {
  const [rows] = await pool.query('SELECT * FROM syllabus');
  return rows;
}

// Fetch a single syllabus post by slug
export async function getSyllabusBySlug(sid: string) {
  const [rows] = await pool.query('SELECT * FROM syllabus WHERE id = ?', [sid]);
  const job = JSON.parse(JSON.stringify(rows))[0];
  return job;
}

// Fetch date posts
export async function getDatePosts() {
  const [rows] = await pool.query('SELECT * FROM date');
  return rows;
}

// Fetch a single date post by slug
export async function getDateBySlug(did: string) {
  const [rows] = await pool.query('SELECT * FROM date WHERE id = ?', [did]);
  const job = JSON.parse(JSON.stringify(rows))[0];
  return job;
}

////-------------------HOME-------------------////

// Fetch Important Updates

// Fetch Latest live jobs
// Fetch all Jobs posts
export async function getHomeJobPosts() {
  //const [rows] = await pool.query('SELECT * FROM job WHERE last_date > NOW()');
  const [rows] = await pool.query('SELECT * FROM job');
  return rows;
}

// Fetch Latest results

// Fetch Latest live Admit cards


