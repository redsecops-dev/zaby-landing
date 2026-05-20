import Link from "next/link";
import { MapPin, Clock, ChevronRight } from "lucide-react";
import type { JobOpening } from "./types";

interface JobCardProps {
  job: JobOpening;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="group relative flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/60 transition-all duration-300 hover:bg-white/85 hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5">
      <Link href={`/careers/${job.id}`} className="absolute inset-0 z-0" aria-label={`View details for ${job.title}`} />
      
      <div className="flex-1 min-w-0 relative z-10 pointer-events-none">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
            {job.department}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-text-secondary">
            <MapPin className="w-3 h-3" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-text-secondary">
            <Clock className="w-3 h-3" />
            {job.type}
          </span>
        </div>
        <h3 className="text-base font-semibold text-text-primary mb-1.5 group-hover:text-accent transition-colors duration-200">
          {job.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed font-light line-clamp-2">
          {job.description}
        </p>
      </div>
      <div className="shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          <Link
            href={`/careers/${job.id}`}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-text-secondary hover:text-accent transition-colors"
          >
            Details
          </Link>
          <Link
            href={`mailto:careers@zaby.ai?subject=Application — ${encodeURIComponent(job.title)}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-white/60 text-sm font-medium text-text-primary transition-all duration-200 hover:bg-(--color-button-primary-bg) hover:text-white hover:border-transparent hover:shadow-sm"
          >
            Apply
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
