import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">JobMaker</h3>
            <p className="text-sm text-slate-600">
              Get small jobs done fast with trusted local & remote workers.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">For Workers</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/jobs" className="hover:text-primary-600 transition">Browse Jobs</Link></li>
              <li><Link href="/dashboard/worker" className="hover:text-primary-600 transition">Worker Dashboard</Link></li>
              <li><Link href="/profile" className="hover:text-primary-600 transition">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">For Customers</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/create-job" className="hover:text-primary-600 transition">Post a Job</Link></li>
              <li><Link href="/dashboard/customer" className="hover:text-primary-600 transition">Customer Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/" className="hover:text-primary-600 transition">About</Link></li>
              <li><Link href="/admin" className="hover:text-primary-600 transition">Admin</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-600">
          <p>© {new Date().getFullYear()} JobMaker. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="/" className="hover:text-primary-600 transition">Privacy</Link>
            <Link href="/" className="hover:text-primary-600 transition">Terms</Link>
            <Link href="/" className="hover:text-primary-600 transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
