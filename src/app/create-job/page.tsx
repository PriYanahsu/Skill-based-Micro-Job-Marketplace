/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "../../context/UserContext";

type Step = 1 | 2 | 3 | 4;

const CreateJobPage: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const { user } = useUser();
  const router = useRouter();

  // All state declarations MUST come before any conditional returns
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("1");
  const [jobType, setJobType] = useState<"remote" | "local">("remote");
  const [location, setLocation] = useState("");
  const [expiry, setExpiry] = useState("2h");
  const [visibility, setVisibility] = useState<"recommended" | "all">("recommended");
  const [submitting, setSubmitting] = useState(false);

  // Redirect if not logged in or not a customer
  useEffect(() => {
    if (user === null) {
      router.push("/auth/login?redirect=/create-job");
      return;
    }
    if (user && user.role !== "customer") {
      router.push("/dashboard/worker");
      return;
    }
  }, [user, router]);

  if (!user || user.role !== "customer") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900 mb-2">Access Denied</p>
          <p className="text-sm text-slate-600 mb-4">Only customers can post jobs.</p>
          <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Login as Customer
          </Link>
        </div>
      </div>
    );
  }

  const goNext = () => setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
  const goBack = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  const handlePostJob = async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          skills: skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          budget: Number(budget || "0"),
          durationHours: Number(duration),
          type: jobType,
          location,
          expiry,
          visibility,
          customerName: user?.name ?? "Customer",
        }),
      });
      router.push("/dashboard/customer");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-10 md:py-16">
      <div className="max-w-3xl mx-auto rounded-xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-900">Create a micro job</h1>
            <p className="mt-1 text-xs md:text-sm text-slate-600">
              A guided flow for short 1–3 hour tasks. Keep details clear and focused.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Step {step} of 4
          </p>
        </header>

        {/* Stepper */}
        <ol className="mb-6 flex items-center justify-between gap-2 text-[11px]">
          {[
            "Job basics",
            "Skills & budget",
            "Type & location",
            "Expiry & review",
          ].map((label, index) => {
            const currentStep = (index + 1) as Step;
            const isActive = currentStep === step;
            const isDone = currentStep < step;
            return (
              <li key={label} className="flex-1 flex items-center gap-2">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-medium
                    ${isDone ? "bg-emerald-500 text-white" : isActive ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-500"}
                  `}
                >
                  {currentStep}
                </div>
                <span className={`hidden sm:inline truncate ${isActive ? "text-slate-900" : "text-slate-500"}`}>
                  {label}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Form content */}
        <div className="space-y-4">
          {step === 1 && (
            <section className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Job title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="e.g. Assemble IKEA shelf, bugfix in React app"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="Describe what needs to be done, expectations, and any constraints."
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Focus on a clear outcome that can be delivered in 1–3 hours.
                </p>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Required skills</label>
                <input
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="e.g. Figma, React, Furniture assembly"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Separate multiple skills with commas. Workers are matched based on these.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-[1.4fr,1fr]">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Budget</label>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-2 text-xs text-slate-500">
                      USD
                    </span>
                    <input
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      placeholder="e.g. 40"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Fixed price for the entire micro job.
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Estimated duration</label>
                  <select
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-4">
              <fieldset>
                <legend className="mb-2 text-xs font-medium text-slate-700">Job type</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-start gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs hover:border-sky-500">
                    <input
                      type="radio"
                      name="jobType"
                      checked={jobType === "remote"}
                      onChange={() => setJobType("remote")}
                      className="mt-1 h-3.5 w-3.5 text-sky-600 focus:ring-sky-500"
                    />
                    <span>
                      <span className="block text-sm font-medium text-slate-900">Remote</span>
                      <span className="text-[11px] text-slate-600">Can be completed from anywhere.</span>
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs hover:border-sky-500">
                    <input
                      type="radio"
                      name="jobType"
                      checked={jobType === "local"}
                      onChange={() => setJobType("local")}
                      className="mt-1 h-3.5 w-3.5 text-sky-600 focus:ring-sky-500"
                    />
                    <span>
                      <span className="block text-sm font-medium text-slate-900">Local</span>
                      <span className="text-[11px] text-slate-600">Requires the worker to be on site.</span>
                    </span>
                  </label>
                </div>
              </fieldset>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Location
                  <span className="ml-1 text-[11px] font-normal text-slate-500">(for local jobs)</span>
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="Search address or area"
                />
                <div className="mt-2 h-40 rounded-lg border border-dashed border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-center">
                  Map placeholder – job demand heatmap & location picker
                </div>
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Job expiry</label>
                  <select
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  >
                    <option value="2h">Expires in 2 hours</option>
                    <option value="6h">Expires in 6 hours</option>
                    <option value="today">Expires today</option>
                    <option value="tomorrow">Expires tomorrow</option>
                  </select>
                  <p className="mt-1 text-[11px] text-slate-500">
                    After expiry, the job is hidden from new applicants.
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Visibility</label>
                  <select
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as "recommended" | "all")}
                  >
                    <option value="recommended">Recommended workers only</option>
                    <option value="all">All workers</option>
                  </select>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-600">
                <p className="font-medium text-slate-800 mb-1">Review summary</p>
                <p>
                  You&apos;re about to post a 1–3 hour micro job with a fixed budget, clear skills, and a strict expiry.
                  Workers will be able to chat with you, share proof, and build reputation from this job.
                </p>
              </div>
            </section>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>
          {step < 4 ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-md bg-sky-600 px-5 py-2 text-xs md:text-sm font-medium text-white shadow-sm hover:bg-sky-700"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={handlePostJob}
              className="rounded-md bg-sky-600 px-5 py-2 text-xs md:text-sm font-medium text-white shadow-sm hover:bg-sky-700"
            >
              {submitting ? "Posting..." : "Post job"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateJobPage;
