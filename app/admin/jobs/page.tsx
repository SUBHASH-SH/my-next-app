'use client'
import { useState, useEffect } from 'react'
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash } from 'react-icons/fa'

interface Job {
  id: string
  title: string
  organization: string
  category: string
  lastDate: string
  createdAt: string
  summary: string
  startDate: string
  examDate?: string
  feeGeneral: string
  feeOBC: string
  feeSC: string
  feeWomen: string
  ageMin: string
  ageMax: string
  ageRelaxation?: string
  totalVacancies: string
  vacancyBreakup: string
  payScale: string
  salaryBreakup?: string
  selectionProcess: string
  documents: string
  howToApply: string
  applyLink: string
  notificationLink: string
  officialWebsite: string
}

const jobFields = [
  // Basic Information
  { name: 'id', label: 'Job ID', type: 'text', required: true },
  { name: 'title', label: 'Job Title', type: 'text', required: true },
  { name: 'organization', label: 'Organization', type: 'text', required: true },
  { name: 'summary', label: 'Summary', type: 'textarea', required: true },

  // Job Category
  {
    name: 'category',
    label: 'Job Category',
    type: 'select',
    required: true,
    options: [
      { value: 'government', label: 'Government Jobs' },
      { value: 'banking', label: 'Bank Jobs' },
      { value: 'teaching', label: 'Teaching Jobs' },
      { value: 'railway', label: 'Railway Jobs' },
      { value: 'police', label: 'Police Jobs' },
      { value: 'engineering', label: 'Engineering Jobs' },
      { value: 'medical', label: 'Medical Jobs' },
      { value: 'defence', label: 'Defence Jobs' },
      { value: 'other', label: 'Other Jobs' },
    ],
  },

  // Important Dates
  { name: 'startDate', label: 'Start Date', type: 'date', required: true },
  { name: 'lastDate', label: 'Last Date', type: 'date', required: true },
  { name: 'examDate', label: 'Exam Date', type: 'date' },

  // Application Fee
  { name: 'feeGeneral', label: 'General Category Fee', type: 'text', required: true },
  { name: 'feeOBC', label: 'OBC Category Fee', type: 'text', required: true },
  { name: 'feeSC', label: 'SC/ST Category Fee', type: 'text', required: true },
  { name: 'feeWomen', label: 'Women Category Fee', type: 'text', required: true },

  // Age Limit
  { name: 'ageMin', label: 'Minimum Age', type: 'text', required: true },
  { name: 'ageMax', label: 'Maximum Age', type: 'text', required: true },
  { name: 'ageRelaxation', label: 'Age Relaxation Details', type: 'textarea' },

  // Salary
  { name: 'payScale', label: 'Pay Scale', type: 'text', required: true },
  { name: 'salaryBreakup', label: 'Salary Breakup', type: 'textarea' },

  // Vacancy Details
  { name: 'totalVacancies', label: 'Total Vacancies', type: 'text', required: true },
  { name: 'vacancyBreakup', label: 'Vacancy Category Breakup', type: 'textarea', required: true },

  // Selection Process
  { name: 'selectionProcess', label: 'Selection Process', type: 'textarea', required: true },

  // Required Documents
  { name: 'documents', label: 'Required Documents', type: 'textarea', required: true },

  // How to Apply
  { name: 'howToApply', label: 'How to Apply', type: 'textarea', required: true },

  // Important Links
  { name: 'applyLink', label: 'Application Link', type: 'text', required: true },
  { name: 'notificationLink', label: 'Notification Link', type: 'text', required: true },
  { name: 'officialWebsite', label: 'Official Website', type: 'text', required: true },
]

export default function JobsAdmin() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [formData, setFormData] = useState<Partial<Job>>({})

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (job: Job) => {
    setEditingJob(job)
    setFormData(job)
    setIsFormVisible(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete job')
      }

      fetchJobs()
      alert('Job deleted successfully!')
    } catch (error) {
      console.error('Error deleting job:', error)
      alert('Failed to delete job')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      setLoading(true);
  
      const url = editingJob ? `/api/jobs/${editingJob.id}` : '/api/jobs';
      const method = editingJob ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save job');
      }
  
      alert(editingJob ? 'Job updated successfully!' : 'Job saved successfully!');
      setEditingJob(null);
      setFormData({});
      fetchJobs();
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Failed to save job');
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div>
      <h1 className="text-base md:text-lg font-bold mb-3">Manage Jobs</h1>

      {/* Add New Job Button & Form */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <button
          onClick={() => {
            setIsFormVisible(!isFormVisible)
            if (isFormVisible) {
              setEditingJob(null)
              setFormData({})
            }
          }}
          className="w-full px-3 py-2 text-left flex items-center justify-between font-medium text-gray-800 hover:bg-gray-50 text-xs md:text-sm"
        >
          <span>{editingJob ? 'Edit Job' : 'Add New Job'}</span>
          {isFormVisible ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />}
        </button>

        {isFormVisible && (
          <form onSubmit={handleSubmit} className="p-3 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobFields.map((field) => (
                <div key={field.name} className="space-y-1">
                  <label className="text-sm text-gray-600">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name as keyof Job] || ''}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md text-sm"
                      required={field.required}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name as keyof Job] || ''}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md text-sm"
                      required={field.required}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof Job] || ''}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md text-sm"
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {editingJob ? 'Update Job' : 'Add Job'}
            </button>
          </form>
        )}
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-3">
          <h2 className="text-sm md:text-base font-medium mb-2">All Jobs</h2>
          {loading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-xs md:text-sm">No jobs found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-xs md:text-sm">
                    <th className="pb-2">Title</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Last Date</th>
                    <th className="pb-2">Created</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-xs md:text-sm">
                  {jobs.map((job) => (
                    <tr key={job.id} className="border-t">
                      <td className="py-1.5">{job.title}</td>
                      <td>{job.category}</td>
                      <td>{new Date(job.lastDate).toLocaleDateString()}</td>
                      <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="text-blue-600 hover:text-blue-800 mr-1.5 text-xs md:text-sm"
                          onClick={() => handleEdit(job)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 text-xs md:text-sm"
                          onClick={() => handleDelete(job.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}