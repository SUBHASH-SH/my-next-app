/*import { FaCalendarAlt, FaBuilding, FaLink } from 'react-icons/fa';
import pool from '@/lib/db';

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

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetail({ params }: JobDetailPageProps) {
  const { id } = await params;

  try {
    // Fetch job details from the database using the ID
    const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [id]);
    const job = JSON.parse(JSON.stringify(rows))[0];

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
      <div className="container mx-auto px-4 py-8">
      {/ Header Section /}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-4">{job.title}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
          <div className="flex items-center">
            <FaBuilding className="mr-2" />
            <span>{job.organization}</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            <span>Last Date: {new Date(job.lastDate).toLocaleDateString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Important Links /}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
          >
            <FaLink className="mr-2" />
            Apply Online
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

      {/* Summary Section /}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-base font-semibold mb-4">Summary</h2>
        <div className="text-gray-600 whitespace-pre-line text-sm">
          {job.summary}
        </div>
      </div>

      {/* Main Content Grid /}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Important Dates /}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-base font-semibold mb-4">Important Dates</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
              <span className="font-medium text-gray-600">Start Date:</span>
              <span className="text-green-600">{new Date(job.startDate).toLocaleDateString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-red-50 rounded-md">
              <span className="font-medium text-gray-600">Last Date:</span>
              <span className="text-red-600">{new Date(job.lastDate).toLocaleDateString('en-IN')}</span>
            </div>
            {job.examDate && (
              <div className="flex items-center justify-between p-2 bg-purple-50 rounded-md">
                <span className="font-medium text-gray-600">Exam Date:</span>
                <span className="text-purple-600">{new Date(job.examDate).toLocaleDateString('en-IN')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Application Fee /}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-base font-semibold mb-4">Application Fee</h2>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">General:</span>
              <span className="ml-2">₹{job.feeGeneral}</span>
            </div>
            <div>
              <span className="font-medium">OBC:</span>
              <span className="ml-2">₹{job.feeOBC}</span>
            </div>
            <div>
              <span className="font-medium">SC/ST:</span>
              <span className="ml-2">₹{job.feeSC}</span>
            </div>
            <div>
              <span className="font-medium">Women:</span>
              <span className="ml-2">₹{job.feeWomen}</span>
            </div>
          </div>
        </div>

        {/* Age Limit /}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-base font-semibold mb-4">Age Limit</h2>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Minimum Age:</span>
              <span className="ml-2">{job.ageMin} years</span>
            </div>
            <div>
              <span className="font-medium">Maximum Age:</span>
              <span className="ml-2">{job.ageMax} years</span>
            </div>
            {job.ageRelaxation && (
              <div>
                <span className="font-medium">Age Relaxation:</span>
                <div className="mt-2 text-gray-600 whitespace-pre-line text-sm">{job.ageRelaxation}</div>
              </div>
            )}
          </div>
        </div>

        {/ Salary Details /}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-base font-semibold mb-4">Salary Details</h2>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Pay Scale:</span>
              <span className="ml-2">{job.payScale}</span>
            </div>
            {job.salaryBreakup && (
              <div>
                <span className="font-medium">Salary Breakup:</span>
                <div className="mt-2 text-gray-600 whitespace-pre-line text-sm">{job.salaryBreakup}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/ Full Width Sections /}
      <div className="space-y-6 mt-6">
        {/ Vacancy Details /}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-base font-semibold mb-4">Vacancy Details</h2>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Total Vacancies:</span>
              <span className="ml-2">{job.totalVacancies}</span>
            </div>
            <div>
              <span className="font-medium">Category-wise Breakup:</span>
              <div className="mt-2 text-gray-600 whitespace-pre-line text-sm">{job.vacancyBreakup}</div>
            </div>
          </div>
        </div>

        {/ Selection Process /}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-base font-semibold mb-4">Selection Process</h2>
          <div className="text-gray-600 whitespace-pre-line text-sm">{job.selectionProcess}</div>
        </div>

        {/ Required Documents /}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-base font-semibold mb-4">Required Documents</h2>
          <div className="text-gray-600 whitespace-pre-line text-sm">{job.documents}</div>
        </div>

        {/ How to Apply /}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-base font-semibold mb-4">How to Apply</h2>
          <div className="text-gray-600 whitespace-pre-line text-sm">{job.howToApply}</div>
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
}*/
