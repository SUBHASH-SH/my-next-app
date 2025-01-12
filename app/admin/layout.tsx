'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FaBriefcase, FaIdCard, FaClipboardList, FaNewspaper, FaBook, FaCalendar, FaKey, FaTachometerAlt } from 'react-icons/fa'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const menuItems = [
    { icon: FaTachometerAlt, label: 'Dashboard', href: '/admin' },
    { icon: FaBriefcase, label: 'Jobs', href: '/admin/jobs' },
    { icon: FaIdCard, label: 'Admit Cards', href: '/admin/admit-cards' },
    { icon: FaClipboardList, label: 'Results', href: '/admin/results' },
    { icon: FaNewspaper, label: 'News', href: '/admin/news' },
    { icon: FaKey, label: 'Answer Keys', href: '/admin/answer-keys' },
    { icon: FaBook, label: 'Syllabus', href: '/admin/syllabus' },
    { icon: FaCalendar, label: 'Date Sheets', href: '/admin/date-sheets' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-blue-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <Link href="/admin" className="text-xl font-bold mb-8 block hover:text-blue-200 transition-colors">
            Admin Panel
          </Link>
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    <item.icon />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Admin User</span>
              <button className="text-red-600 hover:text-red-800">Logout</button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}