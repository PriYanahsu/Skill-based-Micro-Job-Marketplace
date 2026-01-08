import React from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-sky-200 bg-sky-50">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700">✨ Fast, Trusted, Real-time</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 text-slate-900">
                Get work done in{" "}
                <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  minutes, not days
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
                Post short micro jobs and connect with verified workers instantly. Or find high-paying 1–3 hour gigs that fit your schedule. Real-time chat, reputation scoring, and secure payments.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/create-job"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-200 group"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Post a Job
                </Link>
                <Link
                  href="/jobs"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-slate-300 text-slate-900 font-semibold hover:border-sky-500 hover:bg-sky-50 transition-all duration-200 group"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Browse Jobs
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-slate-700">1,234+ Active Jobs</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200">
                  <svg className="w-5 h-5 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium text-slate-700">98% Success Rate</span>
                </div>
              </div>
            </div>

            {/* Right - Animated Job Cards */}
            <div className="relative hidden lg:block">
              {/* Floating cards */}
              <div className="relative h-96">
                {/* Card 1 */}
                <div className="absolute top-0 right-0 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl p-6 hover:shadow-2xl transition-shadow hover:-translate-y-2">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold mb-2">
                        Design
                      </div>
                      <h3 className="font-bold text-slate-900">Logo Redesign</h3>
                    </div>
                    <span className="text-lg font-bold text-green-600">$45</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Modern logo refresh for tech startup</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>⏱️ 2h · Remote</span>
                    <span className="text-emerald-600 font-semibold">7 apps</span>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="absolute top-24 left-0 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl p-6 hover:shadow-2xl transition-shadow hover:-translate-y-2">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-2">
                        Installation
                      </div>
                      <h3 className="font-bold text-slate-900">Shelf Assembly</h3>
                    </div>
                    <span className="text-lg font-bold text-green-600">$35</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">IKEA furniture setup in apartment</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>⏱️ 1h · Local</span>
                    <span className="text-emerald-600 font-semibold">12 apps</span>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="absolute top-48 right-0 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl p-6 hover:shadow-2xl transition-shadow hover:-translate-y-2">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-2">
                        Development
                      </div>
                      <h3 className="font-bold text-slate-900">Bug Fixes</h3>
                    </div>
                    <span className="text-lg font-bold text-green-600">$60</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">React component performance issues</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>⏱️ 3h · Remote</span>
                    <span className="text-emerald-600 font-semibold">18 apps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Designed for speed and trust
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every feature built to eliminate friction and maximize outcomes for both customers and workers.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "⚡",
                title: "Post in seconds",
                description: "Intuitive multi-step form guides you through job creation in under 2 minutes. Clear structure ensures nothing gets missed."
              },
              {
                icon: "⭐",
                title: "Verified & rated",
                description: "Every worker has a reputation score, review history, and skill verification. Know who you're hiring before the job starts."
              },
              {
                icon: "💬",
                title: "Real-time chat",
                description: "Job-based messaging keeps all context in one place. Share files, provide updates, and resolve issues instantly."
              },
              {
                icon: "🛡️",
                title: "Secure payments",
                description: "Escrow-based payments protect both sides. Money is held until work is complete and accepted."
              },
              {
                icon: "📊",
                title: "Analytics & insights",
                description: "Track your job performance, worker quality metrics, and spending. Data-driven hiring decisions."
              },
              {
                icon: "🌍",
                title: "Local & remote",
                description: "Find workers nearby for hands-on tasks or tap into global talent for remote work. Your choice."
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-200 bg-white p-8 hover:border-sky-500 hover:shadow-lg hover:bg-sky-50 transition-all duration-200"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-sky-600 via-blue-600 to-blue-700 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { number: "1,234+", label: "Active Jobs" },
              { number: "567+", label: "Verified Workers" },
              { number: "98%", label: "Success Rate" },
              { number: "1.5h", label: "Avg Completion" },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-4xl md:text-5xl font-black mb-2">{stat.number}</p>
                <p className="text-blue-100 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-12 md:p-20 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of customers and workers who are getting work done faster on MicroJobs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-all duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white font-semibold hover:bg-white hover:text-slate-900 transition-all duration-200"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
