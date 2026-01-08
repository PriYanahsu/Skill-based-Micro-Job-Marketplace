import { NextResponse } from "next/server";
import { getAllApplications, getJobs } from "../../../../lib/store";

export async function GET() {
  const jobs = getJobs();
  const applications = getAllApplications();

  return NextResponse.json({
    totalJobs: jobs.length,
    totalApplications: applications.length,
    recentJobs: jobs.slice(0, 10),
    recentApplications: applications.slice(0, 10),
  });
}


