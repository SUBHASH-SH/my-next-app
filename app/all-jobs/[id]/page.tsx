import { getJobPostBySlug, getJobPosts } from '@/lib/post';
import type { Metadata } from "next";
import Link from 'next/link';

interface JobDetail {
  id: string;
  title: string;
  organization: string;
  summary: string;
  startDate: string;
  lastDate: string;
  postDate: string;
  examDate: string | null;
  otherDate: string | null;
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
  studyMaterial: string;
}

interface Job {
  id: string;
  title: string;
  organization: string;
  category: string;
  postdate: string;
  isNew:true;
  post:"1105 Posts";
  lastDate:string;
  qualification:"Graduation";
}

const results = [
  {
    title: 'SSC GD Constable Result 2024',
    date: 'Updated: 15 March 2024',
    status: 'Live'
  },
  {
    title: 'IBPS PO Final Result 2024',
    date: 'Updated: 14 March 2024',
    status: 'Live'
  },
  {
    title: 'UP Police Constable Result 2024',
    date: 'Updated: 13 March 2024',
    status: 'Live'
  }
];

async function getJobs() {
  const posts = await getJobPosts();
  const jobs: Job[] = JSON.parse(JSON.stringify(posts));
  return jobs;
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Fetch job details from the database
  const job = await getJobPostBySlug(params.id);

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
      url: `https://example.com/jobs/${params.id}`,
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
  params: { id: string };
}) {
  const jid = params.id;
  console.log(jid);

  try {
    const job = await getJobPostBySlug(jid);
    const sidejobs = await getJobs();
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

    const schemaMarkup = {
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "title": job.title,
      "description": job.summary,
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.organization,
        "sameAs": job.officialWebsite
      },
      "datePosted": new Date(job.startDate).toISOString(),
      "validThrough": new Date(job.lastDate).toISOString(),
      "employmentType": "Full-time",
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "India"
        }
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": {
          "@type": "QuantitativeValue",
          "value": job.payScale,
          "unitText": "MONTH"
        }
      },
      "applicationContact": {
        "@type": "ContactPoint",
        "contactType": "HR",
        "url": job.applyLink
      }
    };

    const breadcrumbMarkup = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://example.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Jobs",
          "item": "https://example.com/jobs"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": job.title,
          "item": `https://example.com/jobs/${jid}`
        }
      ]
    };

    const webpageMarkup = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": job.title,
      "description": job.summary,
      "url": `https://example.com/jobs/${jid}`
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbMarkup)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(webpageMarkup)}
        </script>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content (2/3 width on desktop) */}
          <div className="md:col-span-2">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-4">{job.title}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                <div className="flex items-center" style={{ width: '100%' }}>
                  <span>Category: {job.category}</span>
                  <span style={{ marginLeft: 'auto' }}>Post Date: {new Date(job.postDate).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex items-center">
                  <span>Organization: {job.organization}</span>
                </div>
                <div className="flex items-center">
                  <span>{job.summary}</span>
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
                  className="inline-flex items-center px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                >
                  Apply Online
                </a>
                <a
                  href={job.notificationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  Official Notification
                </a>
                <a
                  href={job.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
                >
                  Official Website
                </a>
                <a
                  href={job.studyMaterial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm"
                >
                  Study Material
                </a>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Important Dates */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-4">Important Dates</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-2 bg-green-100 rounded-md">
                    <span className="font-medium text-gray-800">Start Date:</span>
                    <span className="text-green-800">{new Date(job.startDate).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-red-100 rounded-md">
                    <span className="font-medium text-gray-800">Last Date:</span>
                    <span className="text-red-800">{new Date(job.lastDate).toLocaleDateString('en-IN')}</span>
                  </div>
                  {job.examDate && (
                    <div className="flex items-center justify-between p-2 bg-purple-100 rounded-md">
                      <span className="font-medium text-gray-800">Exam Date:</span>
                      <span className="text-purple-800">{new Date(job.examDate).toLocaleDateString('en-IN')}</span>
                    </div>
                  )}
                  <div>
                    <span className="ml-2 text-gray-600 whitespace-pre-line text-sm">{job.feeGeneral}</span>
                  </div>
                </div>
              </div>

              {/* Application Fee */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-4">Application Fee</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="ml-2 text-gray-600 whitespace-pre-line text-sm">{job.feeGeneral}</span>
                  </div>
                  <div>
                    <span className="ml-2 text-gray-600 whitespace-pre-line text-sm">{job.feeOBC}</span>
                  </div>
                  <div>
                    <span className="ml-2 text-gray-600 whitespace-pre-line text-sm">{job.feeSC}</span>
                  </div>
                  <div>
                    <span className="ml-2 text-gray-600 whitespace-pre-line text-sm">{job.feeWomen}</span>
                  </div>
                </div>
              </div>

              {/* Age Limit */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-4">Age Limit</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-600 whitespace-pre-line text-sm">Minimum Age:</span>
                    <span className="ml-2 text-gray-600 whitespace-pre-line text-sm">{job.ageMin} years</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 whitespace-pre-line text-sm">Maximum Age:</span>
                    <span className="ml-2 text-gray-600 whitespace-pre-line text-sm">{job.ageMax} years</span>
                  </div>
                  {job.ageRelaxation && (
                    <div>
                      <span className="font-medium text-gray-600 whitespace-pre-line text-sm">Age Relaxation:</span>
                      <div className="mt-2 text-gray-600 whitespace-pre-line text-sm">{job.ageRelaxation}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Salary Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-4">Salary Details</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600 whitespace-pre-line text-sm">Pay Scale:</span>
                    <span className="text-gray-600 whitespace-pre-line text-sm">{job.payScale}</span>
                  </div>
                  {job.salaryBreakup && (
                    <div>
                      <span className="text-gray-600 whitespace-pre-line text-sm">Salary Breakup:</span>
                      <div className="mt-2 text-gray-600 whitespace-pre-line text-sm">{job.salaryBreakup}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Full Width Sections */}
            <div className="space-y-6 mt-6">
              {/* Vacancy Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-4">Vacancy Details</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600 whitespace-pre-line text-sm">Total Vacancies:</span>
                    <span className="text-gray-600 whitespace-pre-line text-sm">{job.totalVacancies}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 whitespace-pre-line text-sm">Category-wise Breakup:</span>
                    <div className="mt-2 text-gray-600 whitespace-pre-line text-sm">{job.vacancyBreakup}</div>
                  </div>
                </div>
              </div>

              {/* Selection Process */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-4">Selection Process</h2>
                <div className="text-gray-600 whitespace-pre-line text-sm">{job.selectionProcess}</div>
              </div>

              {/* Required Documents */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-4">Required Documents</h2>
                <div className="text-gray-600 whitespace-pre-line text-sm">{job.documents}</div>
              </div>

              {/* How to Apply */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-4">How to Apply</h2>
                <div className="text-gray-600 whitespace-pre-line text-sm">{job.howToApply}</div>
              </div>
            </div>
          </div>

          {/* Right-Side Placeholder (1/3 width on desktop) */}
          <div className="md:col-span-1">
            {/* Featured Jobs */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Featured Jobs</h2>
              <div className="space-y-3">
                {/* Placeholder for Featured Jobs */}
                {sidejobs.map(job => (
                  <div key={job.title} className="border-b pb-4 last:border-0">
                    <Link href={`/all-jobs/${job.id}`}>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-black">{job.title}</h3>
                        {job.isNew && (
                          <span className="px-2 py-1 bg-yellow-200 text-yellow-900 text-xs rounded">
                            New
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                        <div className="text-gray-700">{job.post}</div>
                        <div className="text-gray-700">{job.lastDate}</div>
                        <div className="text-gray-700">Qualification: {job.qualification}</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Jobs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Latest Results</h2>
              <div className="space-y-3">
                {/* Placeholder for Latest Jobs */}
                {results.map(result => (
                  <div key={result.title} className="border-b pb-3 last:border-0">
                    <Link href="/all-jobs" className="block hover:text-red-700">
                      <h3 className="font-medium text-black">{result.title}</h3>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-700">{result.date}</span>
                        <span className="text-green-700 font-medium">{result.status}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            {/* Latest Jobs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Latest Admit Cards</h2>
              <div className="space-y-3">
                {/* Placeholder for Latest Jobs */}
                {results.map(result => (
                  <div key={result.title} className="border-b pb-3 last:border-0">
                    <Link href="/all-jobs" className="block hover:text-red-700">
                      <h3 className="font-medium text-black">{result.title}</h3>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-700">{result.date}</span>
                        <span className="text-green-700 font-medium">{result.status}</span>
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