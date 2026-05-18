import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JOB_OPENINGS } from "@/components/sections/careers/data";
import JobClient from "./JobClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = JOB_OPENINGS.find((j) => j.id === id);

  if (!job) {
    return {
      title: "Job Not Found - Zaby",
    };
  }

  return {
    title: `${job.title} - Careers at Zaby`,
    description: job.description,
  };
}

export default async function JobPage({ params }: Props) {
  const { id } = await params;
  const job = JOB_OPENINGS.find((j) => j.id === id);

  if (!job) {
    notFound();
  }

  return <JobClient job={job} />;
}

// Generate static params for all known jobs to speed up builds and enable static generation
export async function generateStaticParams() {
  return JOB_OPENINGS.map((job) => ({
    id: job.id,
  }));
}
