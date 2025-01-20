import { FaBuilding, FaLink } from 'react-icons/fa';
import { getNewsBySlug } from '@/lib/post';
import { getNewsPosts } from '@/lib/post';
import Link from 'next/link';

interface JobDetail {
  id: string;
  title: string;
  organization: string;
  summary: string;
  startDate: string;
  lastDate: string;
  examDate: string | null;
  feeGeneral: string;
  feeOBC: string;
  feeSC: string;
  feeWomen: string;
  ageMin: string;
  ageMax: string;
  ageRelaxation: string | null;
  totalVacancies: string;
  vacancyBreakup: string;
  payScale: string;
  salaryBreakup: string | null;
  selectionProcess: string;
  documents: string;
  howToApply: string;
  applyLink: string;
  notificationLink: string;
  officialWebsite: string;
}

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

export default async function JobDetail({
  params,
}:{
    params: Promise<{ id: string }>
})
{
  const rid = (await params).id;
  console.log(rid);

  
  try {
    const job = await getNewsBySlug(rid);
    const jobs = await getJobs();
    if (!job) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p>The job you are looking for does not exist or has been removed.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8" style={{ maxWidth: '800px', color: 'black' }}>
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-4">{job.title}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
          <div className="flex items-center" style={{ width: '100%' }}>
            <span>Category: {job.category}</span>
            <span style={{ marginLeft: 'auto' }}>Post Date: {new Date(job.startDate).toLocaleDateString('en-IN')}</span>
          </div>
          <div className="flex items-center">
            <FaBuilding className="mr-2" />
            <span>{job.organization}</span>
          </div>
          
        </div>
      </div>

      {/* Important Links */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition-colors text-sm"
          >
            <FaLink className="mr-2" />
            Check Result
          </a>
          <a
            href={job.notificationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <FaLink className="mr-2" />
            Official Notification
          </a>
          <a
            href={job.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
          >
            <FaLink className="mr-2" />
            Official Website
          </a>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Top News</h2>
        <div className="text-gray-800 whitespace-pre-line text-sm">
        <ul>
          {jobs.map((job) => {
            return (
              <li key={job.id}>
                <Link href={`/news/${job.id}`}>
                <div style={{ cursor: 'pointer', padding: '10px',  marginBottom: '10px', color: 'black' }}>
                    <h2>{job.title}</h2>
                    <p>Organization: {job.organization}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        </div>
      </div>

      {/* Full Width Sections */}
      <div className="space-y-6 mt-6">

        {/* How to Apply */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Related news</h2>
          <div className="text-gray-800 whitespace-pre-line text-sm">
          <ul>
          {jobs.map((job) => {
            return (
              <li key={job.id}>
                <Link href={`/news/${job.id}`}>
                <div style={{ cursor: 'pointer', padding: '10px',  marginBottom: '10px', color: 'black' }}>
                    <h2>{job.title}</h2>
                    <p>Organization: {job.organization}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        </div>
        </div>
      </div>
    </div>
    );
  } catch (error) {
    console.error('Error fetching job details:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>Failed to fetch job details. Please try again later.</p>
        </div>
      </div>
    );
  }
}
