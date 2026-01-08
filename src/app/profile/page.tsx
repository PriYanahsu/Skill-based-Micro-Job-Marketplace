 "use client";

import React from "react";
import { useUser } from "../../context/UserContext";

const ProfilePage: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="container py-10 md:py-14">
      <div className="max-w-3xl mx-auto rounded-xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm space-y-6">
        <header>
          <p className="text-xs text-slate-500">Profile</p>
          <h1 className="text-2xl font-bold text-slate-900">Your profile</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your details, skills, and reputation. Others see your role-specific info.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 text-sm">
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <p className="text-[11px] font-medium text-slate-500">Name</p>
            <p className="text-base font-semibold text-slate-900">{user?.name || "Anonymous"}</p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <p className="text-[11px] font-medium text-slate-500">Role</p>
            <p className="text-base font-semibold text-slate-900">{user?.role ?? "Not set"}</p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900 mb-2">Skills</h2>
            <p className="text-xs text-slate-600">Add skills to improve matching and trust.</p>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full bg-sky-50 border border-sky-100 px-2 py-0.5 text-sky-700">React</span>
              <span className="rounded-full bg-sky-50 border border-sky-100 px-2 py-0.5 text-sky-700">Figma</span>
              <span className="rounded-full bg-sky-50 border border-sky-100 px-2 py-0.5 text-sky-700">QA</span>
            </div>
          </div>
          <div className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900 mb-2">Ratings & reviews</h2>
            <p className="text-xs text-slate-600">Reputation grows as you complete micro jobs.</p>
            <div className="mt-2 rounded-md border border-dashed border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-500">
              No ratings yet. Complete jobs to start building your score.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
