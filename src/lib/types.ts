export type UserRole = "customer" | "worker" | "admin";

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export type JobType = "remote" | "local";

export interface Job {
  id: string;
  title: string;
  description: string;
  skills: string[];
  budget: number;
  durationHours: number;
  type: JobType;
  location: string;
  expiry: string;
  visibility: "recommended" | "all";
  customerName: string;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  workerId?: string;
  workerName: string;
  message: string;
  createdAt: string;
}


