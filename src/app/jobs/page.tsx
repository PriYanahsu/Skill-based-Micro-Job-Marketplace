"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { Job } from "../../lib/types";

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/jobs");
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-12 mb-8">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Browse Micro Jobs</h1>
          <p className="text-base text-primary-100 max-w-2xl">
            Filter by skills, budget, location, and expiry to quickly find work that fits your schedule.
          </p>
        </div>
      </div>

      <div className="container pb-12">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-80">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  Reset
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Skill</label>
                  <input
                    placeholder="e.g. Design, React"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Location</label>
                  <select className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200">
                    <option>Any</option>
                    <option>Remote only</option>
                    <option>Local only</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Min budget</label>
                    <input
                      placeholder="$"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Max budget</label>
                    <input
                      placeholder="$"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Expiry</label>
                  <select className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200">
                    <option>Any time</option>
                    <option>Starting now</option>
                    <option>Due today</option>
                    <option>Due this week</option>
                  </select>
                </div>
                <button className="btn-primary w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-lg mt-2">
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Job Cards */}
          <section className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-600">
                Showing <span className="font-bold text-slate-900">{jobs.length}</span> jobs
              </p>
            </div>
            <div className="grid gap-4">
              {jobs.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                  <div className="inline-flex items-center justify-center rounded-full bg-slate-100 p-4 mb-4">
                    <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-slate-900 mb-2">No jobs found</p>
                  <p className="text-sm text-slate-600">Try adjusting your filters or check back later</p>
                </div>
              ) : (
                jobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.id}`}
                    className="job-card group block rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-primary-300 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          {job.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="inline-flex items-center rounded-md bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-700">
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="text-xs text-slate-500">+{job.skills.length - 3} more</span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition">
                          {job.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{job.description || "No description."}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {job.type} {job.location && `· ${job.location}`}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {job.expiry}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-900 mb-1">${job.budget}</p>
                        <p className="text-xs text-amber-600 font-medium mb-3">{job.expiry}</p>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition">
                          View Details
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
