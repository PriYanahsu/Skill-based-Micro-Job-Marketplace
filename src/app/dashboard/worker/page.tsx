"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { Job } from "../../../lib/types";
import { useUser } from "../../../context/UserContext";

const WorkerDashboard: React.FC = () => {
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

  return (
    <div className="container py-10 md:py-14 space-y-6">
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-500">Worker dashboard</p>
          <h1 className="text-2xl font-bold text-slate-900">Hi{user?.name ? `, ${user.name}` : ""}</h1>
          <p className="text-sm text-slate-600 mt-1">Find and track micro jobs that fit your schedule.</p>
        </div>
        <Link
          href="/jobs"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
        >
          Browse jobs
        </Link>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Available jobs</p>
          <p className="text-3xl font-semibold text-slate-900">{jobs.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Across remote and local types.</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Remote-friendly</p>
          <p className="text-3xl font-semibold text-slate-900">{jobs.filter((j) => j.type === "remote").length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Jobs you can do from anywhere.</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Local nearby</p>
          <p className="text-3xl font-semibold text-slate-900">{jobs.filter((j) => j.type === "local").length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Requires onsite presence.</p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Suggested for you</h2>
            <p className="text-[11px] text-slate-500">Short, high-intent micro jobs.</p>
          </div>
          <Link href="/jobs" className="text-[11px] text-sky-700 underline">
            View all
          </Link>
        </div>
        {jobs.length === 0 ? (
          <p className="text-xs text-slate-500">No jobs yet. Check back soon.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {jobs.slice(0, 4).map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 shadow-sm hover:border-sky-200 hover:bg-white"
              >
                <p className="text-[11px] font-medium text-sky-700">{job.skills.join(", ") || "General"}</p>
                <p className="text-sm font-semibold text-slate-900">{job.title}</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  ${job.budget} · {job.durationHours}h · {job.type === "remote" ? "Remote" : job.location || "Local"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default WorkerDashboard;
