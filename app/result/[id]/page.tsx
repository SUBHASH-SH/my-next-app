import { getResultBySlug, getResultPosts } from '@/lib/post';
import Link from 'next/link';
import { format } from 'date-fns';
import type { Metadata } from "next";

interface resultDetail {
  id :string,
  title :string,
  category :string,
  organization :string,
  post_date :string,
  result_link :string,
  notification_link :string,
  official_website :string,
  summary :string,
  how_to_check :string
}

async function getResultDetails() {
  const posts = await getResultPosts();
  const jobs: resultDetail[] = JSON.parse(JSON.stringify(posts));
  return jobs;
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  // Fetch job details from the database
  const job = await getResultBySlug(id);

  // If job is not found, return default metadata
  if (!job) {
    return {
      title: "Job Not Found - Sarkari Naukri India",
      description: "The job you are looking for does not exist or has been removed. Explore Sarkari Naukri India for more job opportunities.",
    };
  }

  // Return dynamic metadata
  return {
    title: `${job.title} - Sarkari Naukri India`,
    description: job.summary,
    openGraph: {
      title: `${job.title} - Sarkari Naukri India`,
      description: job.summary,
      url: `https://example.com/jobs/${id}`,
      images: [
        {
          url: "https://example.com/og-image.jpg", // Replace with your OG image URL
          width: 1200,
          height: 630,
          alt: job.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} - Sarkari Naukri India`,
      description: job.summary,
      images: ["https://example.com/og-image.jpg"], // Replace with your Twitter image URL
    },
  };
}

export default async function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const rid = (await params).id;
  console.log(rid);

  try {
    const resut = await getResultBySlug(rid);
    const results = await getResultDetails();
    console.log(results);
    console.log(resut);
    if (!resut) {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-4">{resut.title}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                <div className="flex items-center" style={{ width: '100%' }}>
                  <span>Category: {resut.category}</span>
                  <span style={{ marginLeft: 'auto' }}>
                    Post Date: {resut.post_date ? format(new Date(resut.post_date), 'yyyy-MM-dd HH:mm') : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span>{resut.organization}</span>
                </div>
              </div>
            </div>

            {/* Important Links */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={resut.result_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition-colors text-sm"
                >
                  Check Result
                </a>
                <a
                  href={resut.notification_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  Job Notification
                </a>
                <a
                  href={resut.official_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
                >
                  Official Website
                </a>
              </div>
            </div>

            {/* Summary Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Summary</h2>
              <div className="text-gray-800 whitespace-pre-line text-sm">
                {resut.summary}
              </div>
            </div>

            {/* Full Width Sections */}
            <div className="space-y-6 mt-6">
              {/* How to Apply */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-4">How to Check</h2>
                <div className="text-gray-600 whitespace-pre-line text-sm">{resut.how_to_check}</div>
              </div>
            </div>
          </div>

          {/* Right-Side Placeholder (1/3 width on desktop) */}
          <div className="md:col-span-1">
            {/* Latest Results */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Check More Results</h2>
              <div className="space-y-3">
                {/* Placeholder for Latest Jobs */}
                {results.map(result => (
                  <div key={result.title} className="border-b pb-3 last:border-0">
                    <Link href={`/result/${result.id}`} className="block hover:text-red-700">
                      <h3 className="font-medium text-black">{result.title}</h3>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-700">Updated: {format(new Date(result.post_date), 'yyyy-MM-dd')}</span>
                        <span className="text-green-700 font-medium">Live</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
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

/* 
-- Create Table with Generated ID
CREATE TABLE result_details (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    post_date DATE NOT NULL,
    result_link VARCHAR(255),
    notification_link VARCHAR(255) NOT NULL,
    official_website VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    how_to_check TEXT NOT NULL
);

-- Insert Dummy Data with Title-based IDs
INSERT INTO result_details 
(id, title, category, organization, post_date, result_link, notification_link, official_website, summary, how_to_check)
VALUES
(
    REPLACE(LOWER('SSC-CGL-2023-Final-Result'), ' ', '-'),
    'SSC CGL 2023 Final Result',
    'Government Jobs',
    'Staff Selection Commission',
    '2023-11-15',
    'https://example.com/ssc-cgl-2023-result',
    'https://example.com/ssc-cgl-notification',
    'https://ssc.nic.in',
    'Final result for Combined Graduate Level Examination 2023',
    '1. Visit official SSC website\n2. Login with credentials\n3. Check result section'
),
(
    REPLACE(LOWER('UPSC-Civil-Services-2022-Final-Marks'), ' ', '-'),
    'UPSC Civil Services 2022 Final Marks',
    'Civil Services',
    'Union Public Service Commission',
    '2023-09-01',
    NULL,
    'https://example.com/upsc-civil-marksheet',
    'https://upsc.gov.in',
    'Final marksheet for Civil Services Examination 2022',
    '1. Visit UPSC portal\n2. Enter roll number\n3. Download marksheet'
),
(
    REPLACE(LOWER('IBPS-PO-XII-Final-Result'), ' ', '-'),
    'IBPS PO XII Final Result',
    'Banking',
    'Institute of Banking Personnel Selection',
    '2023-12-05',
    'https://example.com/ibps-po-result',
    'https://example.com/ibps-po-notification',
    'https://ibps.in',
    'Probationary Officer final selection list',
    '1. Go to IBPS career page\n2. Click results section\n3. Enter registration details'
);*/
