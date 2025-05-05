// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Job = {
  id: string;
  title: string;
  post_date: string;
  category: string;
  organization: string;
  apply_link: string;
  notification_link: string;
  official_website: string;
  study_material: string;
  summary: string;
  start_date: string;
  last_date: string;
  exam_date: string | null;
  fee_last_date: string;
  admit_card_date: string | null;
  fee_general: string;
  fee_obc: string;
  fee_sc: string;
  fee_women: string;
  fee_men: string;
  free_fee: string;
  age_min: string;
  age_max: string;
  age_relaxation: string | null;
  pay_scale: string;
  salary_breakup: string | null;
  total_vacancies: string;
  vacancy_breakup: string;
  free_vacancy: string;
  qualification: string;
  eligiblity: string;
  selection_process: string;
  documents: string;
  how_to_apply: string;
  free_text_01: string;
  free_text_02: string;
  free_text_03: string;
  free_text_04: string;
  free_text_05: string;
};

export default function AdminPanel() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);
  const [sections, setSections] = useState({
    basic: true,
    dates: false,
    fees: false,
    age: false,
    salary: false,
    vacancies: false,
    eligibility: false,
    process: false,
    freeText: false,
  });
  const { register, handleSubmit, reset } = useForm<Job>();

  // Fetch jobs
  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  // Create or update job
  const onSubmit = async (data: Job) => {
    try {
      const method = editingJob ? "PUT" : "POST";
      const body = editingJob ? { ...data, id: editingJob.id } : data;
      const res = await fetch("/api/jobs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Operation failed");
      }
      reset();
      setEditingJob(null);
      const updatedJobs = await fetch("/api/jobs").then((res) => res.json());
      setJobs(updatedJobs);
    } catch (error: any) {
      alert(`Failed to save job: ${error.message}`);
    }
  };

  // Delete job
  const deleteJob = async (id: string) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Delete failed");
      }
      const updatedJobs = await fetch("/api/jobs").then((res) => res.json());
      setJobs(updatedJobs);
    } catch (error: any) {
      alert(`Failed to delete job: ${error.message}`);
    }
  };

  // Edit job
  const editJob = (job: Job) => {
    setEditingJob(job);
    reset(job);
  };

  // Toggle section
  const toggleSection = (section: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Admin Panel</h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 bg-gray-100 p-4 rounded">
        {/* Basic Info */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => toggleSection("basic")}
            className="text-lg font-semibold"
          >
            {sections.basic ? "▼" : "▶"} Basic Information
          </button>
          {sections.basic && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium">ID</label>
                <input
                  {...register("id", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                  disabled={!!editingJob}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  {...register("title", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Post Date</label>
                <input
                  {...register("post_date", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                  type="date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Category</label>
                <input
                  {...register("category", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Organization</label>
                <input
                  {...register("organization", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Apply Link</label>
                <input
                  {...register("apply_link", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Notification Link</label>
                <input
                  {...register("notification_link", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Official Website</label>
                <input
                  {...register("official_website", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Study Material</label>
                <input
                  {...register("study_material", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Summary</label>
                <textarea
                  {...register("summary", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Dates */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => toggleSection("dates")}
            className="text-lg font-semibold"
          >
            {sections.dates ? "▼" : "▶"} Dates
          </button>
          {sections.dates && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium">Start Date</label>
                <input
                  {...register("start_date", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                  type="date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Last Date</label>
                <input
                  {...register("last_date", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                  type="date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Exam Date</label>
                <input
                  {...register("exam_date")}
                  className="mt-1 p-2 border rounded w-full"
                  type="date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Fee Last Date</label>
                <input
                  {...register("fee_last_date", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                  type="date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Admit Card Date</label>
                <input
                  {...register("admit_card_date")}
                  className="mt-1 p-2 border rounded w-full"
                  type="date"
                />
              </div>
            </div>
          )}
        </div>

        {/* Fees */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => toggleSection("fees")}
            className="text-lg font-semibold"
          >
            {sections.fees ? "▼" : "▶"} Fees
          </button>
          {sections.fees && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium">Fee General</label>
                <input
                  {...register("fee_general", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Fee OBC</label>
                <input
                  {...register("fee_obc", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Fee SC</label>
                <input
                  {...register("fee_sc", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Fee Women</label>
                <input
                  {...register("fee_women", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Fee Men</label>
                <input
                  {...register("fee_men", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Free Fee</label>
                <input
                  {...register("free_fee", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Age */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => toggleSection("age")}
            className="text-lg font-semibold"
          >
            {sections.age ? "▼" : "▶"} Age
          </button>
          {sections.age && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium">Age Min</label>
                <input
                  {...register("age_min", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Age Max</label>
                <input
                  {...register("age_max", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Age Relaxation</label>
                <input
                  {...register("age_relaxation")}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Salary */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => toggleSection("salary")}
            className="text-lg font-semibold"
          >
            {sections.salary ? "▼" : "▶"} Salary
          </button>
          {sections.salary && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium">Pay Scale</label>
                <input
                  {...register("pay_scale", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Salary Breakup</label>
                <textarea
                  {...register("salary_breakup")}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Vacancies */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => toggleSection("vacancies")}
            className="text-lg font-semibold"
          >
            {sections.vacancies ? "▼" : "▶"} Vacancies
          </button>
          {sections.vacancies && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium">Total Vacancies</label>
                <input
                  {...register("total_vacancies", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Vacancy Breakup</label>
                <textarea
                  {...register("vacancy_breakup", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Free Vacancy</label>
                <input
                  {...register("free_vacancy", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Eligibility */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => toggleSection("eligibility")}
            className="text-lg font-semibold"
          >
            {sections.eligibility ? "▼" : "▶"} Eligibility
          </button>
          {sections.eligibility && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium">Qualification</label>
                <textarea
                  {...register("qualification", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Eligibility</label>
                <textarea
                  {...register("eligiblity", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Process */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => toggleSection("process")}
            className="text-lg font-semibold"
          >
            {sections.process ? "▼" : "▶"} Process
          </button>
          {sections.process && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium">Selection Process</label>
                <textarea
                  {...register("selection_process", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Documents</label>
                <textarea
                  {...register("documents", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">How to Apply</label>
                <textarea
                  {...register("how_to_apply", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Free Text */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => toggleSection("freeText")}
            className="text-lg font-semibold"
          >
            {sections.freeText ? "▼" : "▶"} Additional Information
          </button>
          {sections.freeText && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium">Free Text 01</label>
                <textarea
                  {...register("free_text_01", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Free Text 02</label>
                <textarea
                  {...register("free_text_02", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Free Text 03</label>
                <textarea
                  {...register("free_text_03", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Free Text 04</label>
                <textarea
                  {...register("free_text_04", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Free Text 05</label>
                <textarea
                  {...register("free_text_05", { required: true })}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editingJob ? "Update Job" : "Add Job"}
        </button>
        {editingJob && (
          <button
            type="button"
            onClick={() => {
              setEditingJob(null);
              reset();
            }}
            className="ml-2 bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Jobs Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Organization</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Post Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="border p-2">{job.id}</td>
              <td className="border p-2">{job.title}</td>
              <td className="border p-2">{job.organization}</td>
              <td className="border p-2">{job.category}</td>
              <td className="border p-2">{job.post_date}</td>
              <td className="border p-2">
                <button
                  onClick={() => editJob(job)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteJob(job.id)}
                  className="bg-red-500 text-white p-1 rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => setViewingJob(job)}
                  className="bg-green-500 text-white p-1 rounded"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Details Modal */}
      {viewingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{viewingJob.title}</h2>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(viewingJob).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value || "N/A"}
                </p>
              ))}
            </div>
            <button
              onClick={() => setViewingJob(null)}
              className="mt-4 bg-gray-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}