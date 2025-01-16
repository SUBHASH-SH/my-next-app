import { FaCalendarAlt, FaBuilding, FaLink } from 'react-icons/fa';
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
  console.log(id);

  //try {
    // Fetch job details from the database using the ID
    //const [rows] = await pool.query('SELECT * FROM job WHERE id = ?', ['Railway']);
    //const job = JSON.parse(JSON.stringify(rows))[0];

    //if (!job) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p>The job you are looking for does not exist or has been removed.</p>
          </div>
        </div>
      );
    //}

   
  /*} catch (error) {
    console.error('Error fetching job details:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>Failed to fetch job details. Please try again later.</p>
        </div>
      </div>
    );
  }*/
}