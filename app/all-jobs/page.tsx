export default function About() {
    return (
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">About Us</h1>
        <div className="max-w-3xl mx-auto prose">
          <p>
            SarkariNaukri-India.in is your trusted source for the latest government job notifications,
            results, admit cards, and more. We are committed to providing accurate and timely
            information to help you succeed in your career.
          </p>
          {/* Add more content as needed */}
        </div>
      </div>
    )
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

export default async function AllJobs() {
  // Fetch jobs from the database
  const [rows] = await pool.query('SELECT * FROM jobs');
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
  );
}*/
