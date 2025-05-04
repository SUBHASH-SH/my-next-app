// app/page.tsx
import { getJobPosts ,getHomeJobPosts} from '@/lib/post';
import type { Metadata } from "next";
import Link from 'next/link';

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

export const metadata: Metadata = {
  title: "Sarkari Results, Latest Online Form | Result 2025",
  description: "Sarkari Result, Sarkari Results : SarkariResult.com provides latest Sarkari Result Jobs, Online Form, Sarkari Naukri Result in Sarkari Result 2025 various sectors such as Railway, Bank, SSC, Navy, Police, UPPSC, UPSSSC, UPTET, UP Scholarship and other sarkari result Com alerts at one place सरकारी रिजल्ट",
  openGraph: {
    title: "Sarkari Results, Latest Online Form | Result 2025 - Sarkari Naukri India",
    description: "Sarkari Result, Sarkari Results : SarkariResult.com provides latest Sarkari Result Jobs, Online Form, Sarkari Naukri Result in Sarkari Result 2025 various sectors such as Railway, Bank, SSC, Navy, Police, UPPSC, UPSSSC, UPTET, UP Scholarship and other sarkari result Com alerts at one place सरकारी रिजल्ट",
    url: `https://www.sarkarinaukri-india.in/`,
    images: [
      {
        url: "https://example.com/og-image.jpg", // Replace with your OG image URL
        width: 1200,
        height: 630,
        alt: "Sarkari Results, Latest Online Form | Result 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Sarkari Results, Latest Online Form | Result 2025 - Sarkari Naukri India`,
    description: "Sarkari Result, Sarkari Results : SarkariResult.com provides latest Sarkari Result Jobs, Online Form, Sarkari Naukri Result in Sarkari Result 2025 various sectors such as Railway, Bank, SSC, Navy, Police, UPPSC, UPSSSC, UPTET, UP Scholarship and other sarkari result Com alerts at one place सरकारी रिजल्ट",
    images: ["https://example.com/og-image.jpg"], // Replace with your Twitter image URL
  },
};


// add isNew, lastDate, qualification
async function getJobs() {
  const posts = await getJobPosts();
  const jobs: Job[] = JSON.parse(JSON.stringify(posts));
  return jobs;
}

// add isNew, lastDate, qualification
async function getHomeJobs() {
  const posts = await getHomeJobPosts();
  const jobs: Job[] = JSON.parse(JSON.stringify(posts));
  return jobs;
}

export default async function AllJobs() {
  const jobs = await getJobs(); // Fetch data at build time

  const homejobs = await getHomeJobs(); // Fetch data at build time
  console.log(homejobs);
  //console.log(homejobs[0].lastDate);


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

  const admitCards = [
    {
      title: 'UPSC EPFO Admit Card 2024',
      date: 'Updated: 15 March 2024',
      status: 'Download Now'
    },
    {
      title: 'SSC CHSL Admit Card 2024',
      date: 'Updated: 14 March 2024',
      status: 'Download Now'
    },
    {
      title: 'RRB Group D Admit Card 2024',
      date: 'Updated: 13 March 2024',
      status: 'Download Now'
    }
  ];

  const jobCategories = [
    'Banking',
    'Teaching',
    'Railway',
    'Police',
    'Engineering',
    'Medical',
    'Defence',
    'Other'
  ];

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 
    'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 
    'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-8">
      <main className="container mx-auto px-4 py-6">
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <div className="flex items-center space-x-2 text-red-700 mb-3">
            <h3 className="font-semibold">Important Updates</h3>
          </div>
              <ul>
                  {jobs.map((job) => {
                    return (
                      <li key={job.id}>
                        <Link href={`/all-jobs/${job.id}`}>
                        <div className="flex items-center space-x-2" style={{ cursor: 'pointer', marginBottom: '10px', color: 'black' }}>
                        <span className="h-2 w-2 bg-red-600 rounded-full flex-shrink-0"></span>
                        <div><h2>{job.title}</h2></div>
                            
                          </div>
                        </Link>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 border-b pb-2 mb-4">
                <h1 className="text-lg font-bold text-black">Latest Jobs</h1>
              </div>
              <div className="space-y-4">
                {jobs.map(job => (
                  <div key={job.title} className="border-b pb-4 last:border-0">
                    <Link href="/all-jobs" className="block hover:text-red-700">
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
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-black">Featured Government Jobs</h2>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 border-b pb-2 mb-4">
                <h2 className="text-lg font-bold text-black">Latest Results</h2>
              </div>
              <div className="space-y-3">
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
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 border-b pb-2 mb-4">
                <h2 className="text-lg font-bold text-black">Admit Cards</h2>
              </div>
              <div className="space-y-3">
                {admitCards.map(card => (
                  <div key={card.title} className="border-b pb-3 last:border-0">
                    <Link href="#" className="block hover:text-red-700">
                      <h3 className="font-medium text-black">{card.title}</h3>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-700">{card.date}</span>
                        <span className="text-blue-700 font-medium">{card.status}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 border-b pb-2 mb-4">
                <h2 className="text-lg font-bold text-black">Job Categories</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {jobCategories.map(category => (
                  <Link key={category} href={`/all-jobs`}>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                      {category}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 border-b pb-2 mb-4">
                <h2 className="text-lg font-bold text-black">States</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {states.map(state => (
                  <Link key={state} href={`/all-jobs`}>
                    <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                      {state}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
