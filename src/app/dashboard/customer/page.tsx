"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Job } from "../../../lib/types";
import { useUser } from "../../../context/UserContext";

const CustomerDashboard: React.FC = () => {
  const { user } = useUser();
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

  const myJobs = useMemo(
    () => jobs.filter((job) => job.customerName === user?.name),
    [jobs, user?.name]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-8 mb-8">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-primary-100 mb-1">Customer Dashboard</p>
              <h1 className="text-3xl font-bold text-white">Welcome{user?.name ? `, ${user.name}` : ""}</h1>
              <p className="text-sm text-primary-100 mt-2">Post, track, and review your micro jobs</p>
            </div>
            <Link
              href="/create-job"
              className="btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-lg"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post a New Job
            </Link>
          </div>
        </div>
      </div>

      <div className="container space-y-6 pb-12">
        <section className="grid gap-5 md:grid-cols-3">
          <div className="job-card rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-primary-100 p-3">
                <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">Jobs Posted</p>
            <p className="text-3xl font-bold text-slate-900 mb-1">{myJobs.length}</p>
            <p className="text-xs text-slate-500">All jobs you have created</p>
          </div>
          <div className="job-card rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-emerald-100 p-3">
                <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">Live Visibility</p>
            <p className="text-3xl font-bold text-slate-900 mb-1">
              {myJobs.filter((j) => j.expiry !== "expired").length}
            </p>
            <p className="text-xs text-slate-500">Currently open to workers</p>
          </div>
          <div className="job-card rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-amber-100 p-3">
                <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">Budget Planned</p>
            <p className="text-3xl font-bold text-slate-900 mb-1">
              ${myJobs.reduce((sum, j) => sum + (j.budget || 0), 0)}
            </p>
            <p className="text-xs text-slate-500">Total budget across your jobs</p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Your Jobs</h2>
                <p className="text-sm text-slate-600 mt-1">Manage and track all your posted jobs</p>
              </div>
            </div>
          </div>
          {myJobs.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-slate-100 p-4 mb-4">
                <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-base font-medium text-slate-900 mb-2">No jobs yet</p>
              <p className="text-sm text-slate-600 mb-4">Create your first job to start getting applicants</p>
              <Link
                href="/create-job"
                className="btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
              >
                Post Your First Job
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {myJobs.map((job) => (
                <div key={job.id} className="job-card p-6 hover:bg-slate-50 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {job.skills.slice(0, 2).map((skill, idx) => (
                          <span key={idx} className="inline-flex items-center rounded-md bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-700">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 2 && (
                          <span className="text-xs text-slate-500">+{job.skills.length - 2} more</span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{job.title}</h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{job.description.slice(0, 150) || "No description."}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {job.expiry}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900 mb-1">${job.budget}</p>
                      <p className="text-xs text-amber-600 font-medium mb-4">{job.expiry}</p>
                      <Link 
                        href={`/jobs/${job.id}`} 
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition"
                      >
                        View Details
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CustomerDashboard;
