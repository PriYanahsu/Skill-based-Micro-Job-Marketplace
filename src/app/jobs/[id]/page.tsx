"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Application, Job } from "../../../lib/types";
import { useUser } from "../../../context/UserContext";

interface Props {
  params: { id: string } | Promise<{ id: string }>;
}

const JobDetails: React.FC<Props> = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [jobId, setJobId] = useState<string>("");

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await Promise.resolve(params);
      setJobId(resolvedParams.id);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!jobId) return;
    const load = async () => {
      const res = await fetch(`/api/jobs/${jobId}`);
      if (res.ok) {
        const data = await res.json();
        setJob(data.job);
        setApplications(data.applications ?? []);
      }
      setLoading(false);
    };
    load();
  }, [jobId]);

  const hasApplied = applications.some(
    (app) => app.workerId === user?.id || app.workerName === user?.name
  );
  const isOwner = job?.customerName === user?.name;

  const handleApply = async () => {
    if (!user) {
      router.push("/auth/login?redirect=/jobs/" + jobId);
      return;
    }

    if (user.role !== "worker") {
      setError("Only workers can apply for jobs. Please login as a worker.");
      return;
    }

    if (!job) return;
    if (hasApplied) {
      setError("You have already applied to this job.");
      return;
    }
    if (isOwner) {
      setError("You cannot apply to your own job.");
      return;
    }

    setError("");
    setSubmitting(true);
    setSuccess(false);

    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "apply",
          workerId: user.id,
          workerName: user.name,
          customerName: (user.role as string) === "customer" ? user.name : undefined,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setApplications((prev) => [data, ...prev]);
        setMessage("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.error || "Failed to apply. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-sm text-slate-600">Loading job details…</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900 mb-2">Job not found</p>
          <Link href="/jobs" className="text-primary-600 hover:text-primary-700 font-medium">
            Browse other jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-8 mb-8">
        <div className="container">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-primary-100 hover:text-white mb-4 text-sm font-medium">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to jobs
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{job?.title || "Job Details"}</h1>
        </div>
      </div>

      <div className="container pb-12">
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          {/* Main Job Details */}
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center rounded-md bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700">
                      ${job.budget}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {job.durationHours}h duration
                    </span>
                    <span className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-medium ${
                      job.type === "remote" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {job.type === "remote" ? "Remote" : job.location || "Local"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Posted by <span className="font-semibold text-slate-900">{job.customerName}</span> · {job.expiry}
                  </p>
                  <p className="text-base text-slate-700 leading-relaxed mb-6">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.skills.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center rounded-full bg-primary-50 border border-primary-200 px-3 py-1 text-sm font-medium text-primary-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply Section - Only for Workers */}
              {!user ? (
                <div className="border-t border-slate-200 pt-6">
                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 mb-4">
                    <p className="text-sm font-medium text-amber-800 mb-2">
                      Login required to apply
                    </p>
                    <p className="text-xs text-amber-700 mb-3">
                      Please login as a worker to apply for this job.
                    </p>
                    <Link
                      href={`/auth/login?redirect=/jobs/${job.id}`}
                      className="btn-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white"
                    >
                      Login as Worker
                    </Link>
                  </div>
                </div>
              ) : user.role === "worker" ? (
                <div className="border-t border-slate-200 pt-6">
                  {success && (
                    <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 mb-4">
                      <p className="text-sm font-semibold text-emerald-800">
                        ✓ Application submitted successfully!
                      </p>
                      <p className="text-xs text-emerald-700 mt-1">
                        The customer will review your application and contact you if selected.
                      </p>
                    </div>
                  )}
                  {error && (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-4 mb-4">
                      <p className="text-sm font-semibold text-red-800">{error}</p>
                    </div>
                  )}
                  {hasApplied ? (
                    <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                      <p className="text-sm font-semibold text-slate-900 mb-1">
                        ✓ You have applied to this job
                      </p>
                      <p className="text-xs text-slate-600">
                        Your application is being reviewed. Check back for updates.
                      </p>
                    </div>
                  ) : isOwner ? (
                    <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                      <p className="text-sm font-semibold text-slate-900">
                        This is your job posting
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        You cannot apply to your own job. View applications below.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Why are you a good fit? <span className="text-slate-500 font-normal">(optional)</span>
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={4}
                          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                          placeholder="Briefly explain your experience, skills, and why you're perfect for this micro job..."
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleApply}
                        disabled={submitting}
                        className="btn-primary w-full rounded-lg px-6 py-3 text-base font-semibold text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                            Applying...
                          </span>
                        ) : (
                          "Apply for this Job"
                        )}
                      </button>
                    </>
                  )}
                </div>
              ) : user.role === "customer" ? (
                <div className="border-t border-slate-200 pt-6">
                  {isOwner ? (
                    <div className="rounded-lg bg-primary-50 border border-primary-200 p-4">
                      <p className="text-sm font-semibold text-primary-900 mb-1">
                        This is your job posting
                      </p>
                      <p className="text-xs text-primary-700">
                        View applications below. You can manage this job from your dashboard.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                      <p className="text-sm font-semibold text-slate-900">
                        Only workers can apply for jobs
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        Switch to worker account to apply, or post your own job instead.
                      </p>
                    </div>
                  )}
                </div>
              ) : null}

              <div className="border-t border-slate-200 pt-6 mt-6">
                <Link
                  href={`/chat/${job.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Open Chat
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar - Applications */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-1">
                Applications ({applications.length})
              </h2>
              <p className="text-xs text-slate-600 mb-4">
                {isOwner ? "Workers who applied" : "Other applicants"}
              </p>
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center rounded-full bg-slate-100 p-3 mb-3">
                    <svg className="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-slate-900 mb-1">No applications yet</p>
                  <p className="text-xs text-slate-500">Be the first to apply!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className={`rounded-lg border p-4 ${
                        app.workerId === user?.id || app.workerName === user?.name
                          ? "bg-primary-50 border-primary-200"
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-sm font-semibold text-slate-900">{app.workerName}</p>
                        {(app.workerId === user?.id || app.workerName === user?.name) && (
                          <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {app.message || "No message provided."}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-2">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
