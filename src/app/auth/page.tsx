import React from "react";
import Link from "next/link";

const AuthRoot: React.FC = () => {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-3xl font-bold mb-6">Get started</h1>
      <div className="flex justify-center gap-4">
        <Link href="/auth/login" className="px-6 py-3 bg-sky-600 text-white rounded">Login</Link>
        <Link href="/auth/register" className="px-6 py-3 border rounded">Register</Link>
      </div>
    </div>
  );
};

export default AuthRoot;
