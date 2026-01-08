 "use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "../../../context/UserContext";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { loginAs } = useUser();
  const [name, setName] = useState("");
  const [role, setRole] = useState<"customer" | "worker" | "admin">("worker");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const safeName = name.trim() || "Guest";
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      loginAs(safeName, role);

      // Check for redirect query parameter
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");

      if (redirect) {
        router.push(redirect);
      } else {
        // Default redirects based on role
        if (role === "customer") {
          router.push("/dashboard/customer");
        } else if (role === "worker") {
          router.push("/dashboard/worker");
        } else {
          router.push("/admin");
        }
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-slate-600">
              Sign in to access micro jobs and start earning or posting
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Display name
                </span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:bg-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  What's your role?
                </span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Worker Option */}
                <label className={`relative flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${role === "worker" ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <input
                    type="radio"
                    name="role"
                    value="worker"
                    checked={role === "worker"}
                    onChange={(e) => setRole(e.target.value as "worker")}
                    className="w-4 h-4 text-sky-600 cursor-pointer"
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-slate-900">Worker</span>
                    <span className="text-xs text-slate-600">Find jobs</span>
                  </span>
                </label>

                {/* Customer Option */}
                <label className={`relative flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${role === "customer" ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={role === "customer"}
                    onChange={(e) => setRole(e.target.value as "customer")}
                    className="w-4 h-4 text-sky-600 cursor-pointer"
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-slate-900">Customer</span>
                    <span className="text-xs text-slate-600">Post jobs</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Admin Option (subtle) */}
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={(e) => setRole(e.target.value as "admin")}
                  className="w-4 h-4 text-sky-600"
                />
                <div>
                  <span className="text-sm font-medium text-slate-900">Admin</span>
                  <span className="text-xs text-slate-600 ml-2">(Platform management)</span>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!name.trim() || loading}
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:from-sky-600 hover:to-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0a2 2 0 00-2-2H6a2 2 0 00-2 2m16 0h2M4 7h2m12 0h2" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Continue to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-slate-500">Or</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link 
              href="/auth/register" 
              className="font-semibold text-sky-600 hover:text-sky-700 transition-colors"
            >
              Create one here
            </Link>
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-xs text-slate-500">
          <p>🔒 Your data is safe with us • No credit card required</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
