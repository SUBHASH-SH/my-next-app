'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaBriefcase, FaIdCard, FaClipboardList, FaNewspaper, FaBook, FaCalendar, FaKey } from 'react-icons/fa'

interface DashboardStats {
  totalJobs: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ totalJobs: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/jobs/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { icon: FaBriefcase, label: 'Total Jobs', count: stats.totalJobs, href: '/admin/jobs' },
    { icon: FaIdCard, label: 'Admit Cards', count: 0, href: '/admin/admit-cards' },
    { icon: FaClipboardList, label: 'Results', count: 0, href: '/admin/results' },
    { icon: FaNewspaper, label: 'News', count: 0, href: '/admin/news' },
    { icon: FaKey, label: 'Answer Keys', count: 0, href: '/admin/answer-keys' },
    { icon: FaBook, label: 'Syllabus', count: 0, href: '/admin/syllabus' },
    { icon: FaCalendar, label: 'Date Sheets', count: 0, href: '/admin/date-sheets' },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm text-gray-500">{stat.label}</h3>
                {loading ? (
                  <div className="h-6 w-12 bg-gray-200 animate-pulse rounded mt-1"></div>
                ) : (
                  <p className="text-xl font-semibold text-gray-800">{stat.count}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="p-3">Action</th>
                <th className="p-3">Type</th>
                <th className="p-3">Date</th>
                <th className="p-3">User</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              <tr className="border-b">
                <td className="p-3">Added new job post</td>
                <td className="p-3">Job</td>
                <td className="p-3">Mar 15, 2024</td>
                <td className="p-3">Admin</td>
              </tr>
              <tr>
                <td className="p-3">Updated result</td>
                <td className="p-3">Result</td>
                <td className="p-3">Mar 15, 2024</td>
                <td className="p-3">Admin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}