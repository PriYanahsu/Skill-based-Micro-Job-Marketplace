"use client";

import React from "react";

const AnalyticsPage: React.FC = () => {
  return (
    <div className="container py-10 md:py-14 space-y-6">
      <header>
        <p className="text-xs text-slate-500">Insights</p>
        <h1 className="text-2xl font-bold text-slate-900">Analytics & heatmap</h1>
        <p className="text-sm text-slate-600 mt-1">
          Track demand, completion speed, and geographic distribution of micro jobs.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Jobs posted (7d)", value: "32", delta: "+18% vs last week" },
          { label: "Avg completion time", value: "1h 42m", delta: "-9m faster" },
          { label: "Remote vs Local", value: "68% / 32%", delta: "Remote dominant" },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">{card.label}</p>
            <p className="text-2xl font-semibold text-slate-900">{card.value}</p>
            <p className="text-[11px] text-emerald-600">{card.delta}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm h-80 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Job demand heatmap</h2>
              <p className="text-[11px] text-slate-500">Density of active and recent jobs</p>
            </div>
            <span className="text-[11px] text-slate-500">Live</span>
          </div>
          <div className="flex-1 rounded-lg border border-dashed border-slate-200 bg-slate-50" />
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm h-80 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Completion velocity</h2>
              <p className="text-[11px] text-slate-500">Time-to-complete per category</p>
            </div>
            <span className="text-[11px] text-slate-500">Rolling 7 days</span>
          </div>
          <div className="flex-1 rounded-lg border border-dashed border-slate-200 bg-slate-50" />
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;
