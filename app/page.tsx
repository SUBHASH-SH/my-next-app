// app/page.tsx
import { getJobPosts } from '@/lib/post';

interface Job {
  id: string;
  title: string;
  organization: string;
  category: string;
  postdate: string;
}

/*async function getJobs() {
  const posts = await getJobPosts();
  const jobs: Job[] = JSON.parse(JSON.stringify(posts));
  return jobs;
}*/

export default async function AllJobs() {
  //const jobs = await getJobs(); // Fetch data at build time

  const updates = [
    'UPSC सिविल सेवा 2024 आवेदन की अंतिम तिथि कल',
    'SSC CGL 2024 परीक्षा तिथि घोषित',
    'RRB NTPC परिणाम घोषित',
    'IBPS PO मुख्य परीक्षा एडमिट कार्ड जारी'
  ];

  const joba = [
    {
      title: 'UPSC Civil Services 2024',
      posts: '1105 Posts',
      lastDate: 'Last Date: 05/04/2024',
      qualification: 'Graduation',
      isNew: true,
      category: 'Civil Services'
    },
    {
      title: 'Indian Army SSC Tech 2024',
      posts: '191 Posts',
      lastDate: 'Last Date: 28/03/2024',
      qualification: 'B.E/B.Tech',
      isNew: true,
      category: 'Defence'
    },
    {
      title: 'SBI Clerk Recruitment 2024',
      posts: '8283 Posts',
      lastDate: 'Last Date: 21/03/2024',
      qualification: 'Graduation',
      isNew: false,
      category: 'Banking'
    }
  ];

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
    <div className="bg-gray-50 p-4 rounded-lg mb-8">
      <main className="container mx-auto px-4 py-6">
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <div className="flex items-center space-x-2 text-red-600 mb-3">
            <h3 className="font-semibold">Important Updates</h3>
          </div>
          <div className="space-y-2">
            {updates.map(update => (
              <div key={update} className="flex items-center space-x-2">
                <span className="h-2 w-2 bg-red-500 rounded-full"></span>
                <p className="text-gray-800">{update}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 border-b pb-2 mb-4">
                <h1 className="text-lg font-bold text-black">Latest Jobs</h1>
              </div>
              <div className="space-y-4">
                {joba.map(joba => (
                  <div key={joba.title} className="border-b pb-4 last:border-0">
                    <a href="#" className="block hover:text-red-600">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-black">{joba.title}</h3>
                        {joba.isNew && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                            New
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                        <div className="text-gray-600">{joba.posts}</div>
                        <div className="text-gray-600">{joba.lastDate}</div>
                        <div className="text-gray-600">Qualification: {joba.qualification}</div>
                      </div>
                    </a>
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
                    <a href="#" className="block hover:text-red-600">
                      <h3 className="font-medium text-black">{result.title}</h3>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-600">{result.date}</span>
                        <span className="text-green-600 font-medium">{result.status}</span>
                      </div>
                    </a>
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
                    <a href="#" className="block hover:text-red-600">
                      <h3 className="font-medium text-black">{card.title}</h3>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-600">{card.date}</span>
                        <span className="text-blue-600 font-medium">{card.status}</span>
                      </div>
                    </a>
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
                  <button key={category} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 border-b pb-2 mb-4">
                <h2 className="text-lg font-bold text-black">States</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {states.map(state => (
                  <button key={state} className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">
                    {state}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
