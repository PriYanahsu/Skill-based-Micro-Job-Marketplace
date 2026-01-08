import { Application, Job } from "./types";

let jobs: Job[] = [];
let applications: Application[] = [];

export function getJobs() {
  return jobs;
}

export function getJob(id: string) {
  return jobs.find((j) => j.id === id) ?? null;
}

export function addJob(job: Job) {
  jobs = [job, ...jobs];
  return job;
}

export function addApplication(application: Application) {
  applications = [application, ...applications];
  return application;
}

export function getApplicationsForJob(jobId: string) {
  return applications.filter((a) => a.jobId === jobId);
}

export function getAllApplications() {
  return applications;
}


