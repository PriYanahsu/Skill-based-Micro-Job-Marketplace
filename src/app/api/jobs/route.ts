import { NextRequest, NextResponse } from "next/server";
import { addJob, getJobs } from "../../../lib/store";
import { Job } from "../../../lib/types";

export async function GET() {
  return NextResponse.json(getJobs());
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const job: Job = {
    id,
    title: body.title ?? "",
    description: body.description ?? "",
    skills: body.skills ?? [],
    budget: Number(body.budget ?? 0),
    durationHours: Number(body.durationHours ?? 1),
    type: body.type === "local" ? "local" : "remote",
    location: body.location ?? "",
    expiry: body.expiry ?? "",
    visibility: body.visibility === "all" ? "all" : "recommended",
    customerName: body.customerName ?? "Anonymous customer",
    createdAt: now,
  };

  addJob(job);
  return NextResponse.json(job, { status: 201 });
}


