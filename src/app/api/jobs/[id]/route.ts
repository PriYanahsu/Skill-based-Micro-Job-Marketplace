import { NextRequest, NextResponse } from "next/server";
import { addApplication, getApplicationsForJob, getJob } from "../../../../lib/store";
import { Application } from "../../../../lib/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const job = getJob(id);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  const applications = getApplicationsForJob(id);
  return NextResponse.json({ job, applications });
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();

  if (body.action === "apply") {
    // Check if user is logged in as a worker
    if (!body.workerId || !body.workerName) {
      return NextResponse.json({ error: "You must be logged in as a worker to apply" }, { status: 401 });
    }

    const job = getJob(id);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Check if worker is trying to apply to their own job (if they're the customer)
    if (body.customerName === job.customerName) {
      return NextResponse.json({ error: "You cannot apply to your own job" }, { status: 403 });
    }

    // Check if worker already applied
    const existingApps = getApplicationsForJob(id);
    const alreadyApplied = existingApps.some((app) => app.workerId === body.workerId || app.workerName === body.workerName);
    if (alreadyApplied) {
      return NextResponse.json({ error: "You have already applied to this job" }, { status: 409 });
    }

    const application: Application = {
      id: crypto.randomUUID(),
      jobId: id,
      workerId: body.workerId,
      workerName: body.workerName,
      message: body.message ?? "",
      createdAt: new Date().toISOString(),
    };
    addApplication(application);
    return NextResponse.json(application, { status: 201 });
  }

  return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
}


