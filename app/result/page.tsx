// app/page.tsx
import { getResultPosts } from '@/lib/post';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  organization: string;
  category: string;
  startDate: string;
}

async function getJobs() {
  const posts = await getResultPosts();
  const jobs: Job[] = JSON.parse(JSON.stringify(posts));
  return jobs;
}

export default async function AllJobs() {
  const jobs = await getJobs(); // Fetch data at build time

  return (
    <main>
      <h1 style={{ fontWeight: 'bold', color: 'black' }}>Result</h1>
      <ul>
        {jobs.map((job) => {
          return (
            <li key={job.id}>
              <Link href={`/result/${job.id}`}>
                <div style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc', marginBottom: '10px', color: 'black' }}>
                  <h2>{job.title}</h2>
                  <p>Organization: {job.organization}</p>
                  <p>Category: {job.category} <span style={{ float: 'right' }}>Post Date: {new Date(job.startDate).toLocaleDateString()}</span></p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}