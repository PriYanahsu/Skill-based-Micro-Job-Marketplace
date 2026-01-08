"use client";

import React, { useEffect, useState } from "react";
import type { Application, Job } from "../../lib/types";
import { useUser } from "../../context/UserContext";

interface OverviewResponse {
  totalJobs: number;
  totalApplications: number;
  recentJobs: Job[];
  recentApplications: Application[];
}

const AdminPage: React.FC = () => {
  const { user } = useUser();
  const [data, setData] = useState<OverviewResponse | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/admin/overview");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    };
    load();
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <div className="container py-12">
        <p className="text-sm text-slate-600">
          Admin access only. Please sign in as admin from the Login page.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-12 space-y-6">
      <header className="flex items-baseline justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Admin Panel</h1>
          <p className="text-sm text-slate-600">
            Owner view of all jobs and worker applications on the platform.
          </p>
        </div>
        <p className="text-xs text-slate-500">Signed in as {user.name}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-1">Total jobs</p>
          <p className="text-2xl font-semibold text-slate-900">
            {data?.totalJobs ?? 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-1">Total applications</p>
          <p className="text-2xl font-semibold text-slate-900">
            {data?.totalApplications ?? 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-1">Fraud flags</p>
          <p className="text-2xl font-semibold text-slate-900">0</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 text-xs">
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-sm font-semibold mb-2">Recent jobs</h2>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] text-slate-500">
                <th className="py-1 pr-2">Title</th>
                <th className="py-1 pr-2">Customer</th>
                <th className="py-1 pr-2">Budget</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentJobs.map((job) => (
                <tr key={job.id} className="border-b border-slate-50">
                  <td className="py-1 pr-2">{job.title}</td>
                  <td className="py-1 pr-2">{job.customerName}</td>
                  <td className="py-1 pr-2">${job.budget}</td>
                </tr>
              )) || null}
              {data && data.recentJobs.length === 0 && (
                <tr>
                  <td className="py-2 text-slate-500" colSpan={3}>
                    No jobs yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-sm font-semibold mb-2">Recent applications</h2>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] text-slate-500">
                <th className="py-1 pr-2">Worker</th>
                <th className="py-1 pr-2">Job ID</th>
                <th className="py-1 pr-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentApplications.map((app) => (
                <tr key={app.id} className="border-b border-slate-50">
                  <td className="py-1 pr-2">{app.workerName}</td>
                  <td className="py-1 pr-2">{app.jobId}</td>
                  <td className="py-1 pr-2 max-w-[180px] truncate">{app.message}</td>
                </tr>
              )) || null}
              {data && data.recentApplications.length === 0 && (
                <tr>
                  <td className="py-2 text-slate-500" colSpan={3}>
                    No applications yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
