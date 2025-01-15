import Link from 'next/link';
import pool from '@/lib/db';

interface Job {
  id: string;
  title: string;
  organization: string;
  category: string;
  lastDate: string;
}

export default async function AllJobs() {

  const [rows] = await pool.query('SELECT * FROM job');
  const jobs: Job[] = JSON.parse(JSON.stringify(rows));

  return (
    <main>
      <h1>All Jobs</h1>
      <ul>
        {jobs.map((job) => {
          return (
            <li key={job.id}>
              <Link href={`/all-pa/${job.id}`}>
                <div style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
                  <h2>{job.title}</h2>
                  <p>Organization: {job.organization}</p>
                  <p>Category: {job.category}</p>
                  <p>Last Date: {new Date(job.lastDate).toLocaleDateString()}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  )
}
