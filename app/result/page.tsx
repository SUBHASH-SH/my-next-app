// app/page.tsx
import { getResultPosts } from '@/lib/post';
import Link from 'next/link';

interface Result {
  id: string;
  title: string;
  organization: string;
  category: string;
  startDate: string;
}

async function getJobs() {
  const posts = await getResultPosts();
  const jobs: Result[] = JSON.parse(JSON.stringify(posts));
  return jobs;
}

export default async function AllJobs() {
  const jobs = await getJobs();

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-black mb-6">Results</h1>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <Link href={`/result/${job.id}`} className="block hover:bg-gray-50">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h2>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Organization: {job.organization}</p>
                  <div className="flex justify-between items-center">
                    <span>Category: {job.category}</span>
                    <span className="text-gray-500">
                      Posted: {new Date(job.startDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}