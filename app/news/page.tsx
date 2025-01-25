// app/page.tsx
import { getNewsPosts } from '@/lib/post';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  organization: string;
  category: string;
  lastDate: string;
}

async function getJobs() {
  const posts = await getNewsPosts();
  const jobs: Job[] = JSON.parse(JSON.stringify(posts));
  return jobs;
}

export default async function AllJobs() {
  const jobs = await getJobs(); // Fetch data at build time

  return (
    <main>
      <h1 style={{ fontWeight: 'bold', color: 'black' }}>News</h1>
      <ul>
        {jobs.map((job) => {
          return (
            <li key={job.id}>
              <Link href={`/news/${job.id}`}>
              <div style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc', marginBottom: '10px', color: 'black' }}>
                  <h2>{job.title}</h2>
                  <p>Organization: {job.organization}</p>
                  <p>Category: {job.category} <span style={{ float: 'right' }}>Post Date: {new Date(job.lastDate).toLocaleDateString()}</span></p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}




/*import Link from 'next/link';
import pool from '@/lib/db';

interface Job {
  id: string;
  title: string;
  organization: string;
  category: string;
  lastDate: string;
}

// Fetch data at build time
async function getJobs() {
  const [rows] = await pool.query('SELECT * FROM job');
  const jobs: Job[] = JSON.parse(JSON.stringify(rows));
  return jobs;
}

export default async function AllJobs() {
  const jobs = await getJobs(); // Fetch data at build time

  return (
    <main>
      <h1>All Jobs</h1>
      <ul>
        {jobs.map((job) => {
          return (
            <li key={job.id}>
              <Link href={`/all-jobs/${job.id}`}>
                <div style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
                  <h2>{job.title}</h2>
                  <p>Organization: {job.organization}</p>
                  <p>Category: {job.category}</p>
                  <p>Category: {process.env.db_host}</p>
                  <p>Last Date: {new Date(job.lastDate).toLocaleDateString()}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}*/