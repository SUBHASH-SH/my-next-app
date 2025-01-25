// app/page.tsx
import { getJobPosts } from '@/lib/post';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  organization: string;
  category: string;
  postdate: string;
}

async function getJobs() {
  const posts = await getJobPosts();
  const jobs: Job[] = JSON.parse(JSON.stringify(posts));
  return jobs;
}

export default async function AllJobs() {
  const jobs = await getJobs();

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-black mb-6">All Jobs</h1>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="border-b border-gray-200 pb-4 last:border-0">
            <Link href={`/all-jobs/${job.id}`} className="block hover:bg-gray-50 p-4 rounded-lg transition-colors">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
                <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                  <span>Category: {job.category}</span>
                  <span>Post Date: {new Date(job.postdate).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
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