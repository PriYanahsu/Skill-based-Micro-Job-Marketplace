import React from "react";
import Link from "next/link";

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
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
              Join MicroJobs
            </h1>
            <p className="text-sm text-slate-600">
              Start earning or posting micro jobs in minutes
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Full name
                </span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                placeholder="John Doe"
                autoComplete="name"
              />
            </div>

            {/* Email & Password Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  I&apos;m signing up as
                </span>
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                {/* Customer Role */}
                <label className="relative flex cursor-pointer items-start gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 hover:border-sky-300 transition-all">
                  <input
                    type="radio"
                    name="role"
                    defaultChecked
                    className="mt-1 w-4 h-4 text-sky-600 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6m-6-6H6m0 0H0" />
                      </svg>
                      <span className="text-sm font-semibold text-slate-900">Customer</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Post micro jobs, manage workers, track progress</p>
                  </div>
                </label>

                {/* Worker Role */}
                <label className="relative flex cursor-pointer items-start gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 hover:border-sky-300 transition-all">
                  <input
                    type="radio"
                    name="role"
                    className="mt-1 w-4 h-4 text-sky-600 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                      </svg>
                      <span className="text-sm font-semibold text-slate-900">Worker</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Browse jobs, chat with customers, build reputation</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-1 w-4 h-4 rounded text-sky-600"
                  required
                />
                <span className="text-xs text-slate-700">
                  I agree to the <a href="#" className="font-semibold text-sky-600 hover:text-sky-700">Terms of Service</a> and <a href="#" className="font-semibold text-sky-600 hover:text-sky-700">Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:from-sky-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Create Account
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

          {/* Login Link */}
          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link 
              href="/auth/login" 
              className="font-semibold text-sky-600 hover:text-sky-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Features List */}
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <div className="text-center text-xs text-slate-600">
            <div className="text-lg mb-1">⚡</div>
            <p className="font-medium">Quick Setup</p>
            <p>Get started in seconds</p>
          </div>
          <div className="text-center text-xs text-slate-600">
            <div className="text-lg mb-1">🔒</div>
            <p className="font-medium">Secure</p>
            <p>Your data is protected</p>
          </div>
          <div className="text-center text-xs text-slate-600">
            <div className="text-lg mb-1">💰</div>
            <p className="font-medium">Free</p>
            <p>No credit card needed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
