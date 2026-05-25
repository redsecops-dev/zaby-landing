"use client";

import React from "react";
import { Check, X } from "lucide-react";

interface ComparisonRow {
  feature: string;
  zaby: string;
  hackerrank: string;
  mettl: string;
  codility: string;
}

const comparisonData: ComparisonRow[] = [
  { feature: "AI Interactive Labs", zaby: "Yes", hackerrank: "Limited coding only", mettl: "No", codility: "Limited coding only" },
  { feature: "Agentic Question Generation", zaby: "Yes", hackerrank: "No", mettl: "No", codility: "No" },
  { feature: "Dynamic Adaptive Assessments", zaby: "Yes", hackerrank: "Partial", mettl: "Partial", codility: "Partial" },
  { feature: "Multi-Agent Validation", zaby: "Yes", hackerrank: "No", mettl: "No", codility: "No" },
  { feature: "Real-Time Smart Monitoring", zaby: "Yes", hackerrank: "Yes (Streaming)", mettl: "Yes (Streaming)", codility: "Yes (Sync/Async)" },
  { feature: "Enterprise KB Integration", zaby: "Yes", hackerrank: "Limited", mettl: "Limited", codility: "No" },
  { feature: "Static Question Bank Dependency", zaby: "No", hackerrank: "High", mettl: "High", codility: "High" },
  { feature: "Competitive-Exam Compatibility", zaby: "Yes", hackerrank: "Partial", mettl: "Yes", codility: "Partial" },
  { feature: "AI-Powered Optimization", zaby: "Yes", hackerrank: "Limited", mettl: "Limited", codility: "Limited" },
  { feature: "Gen-Z Interaction Experience", zaby: "Yes", hackerrank: "Limited", mettl: "Limited", codility: "Limited" }
];

export default function ComparisonSection() {
  return (
    <section className="px-4 py-20 md:px-6 mx-auto max-w-7xl">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#171717] mt-4 mb-4">
          ZABY vs. Leading Assessment Platforms
        </h2>
        <p className="text-base text-[#525252] font-light">
          Compare Zaby's autonomous agent-driven testing infrastructure against legacy platforms.
        </p>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="w-full relative overflow-hidden rounded-3xl border border-[#e5e5e5] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#FAF9F6]">
                <th className="px-6 py-5 text-sm font-bold text-[#171717] min-w-[240px]">Platform Capability</th>
                <th className="px-6 py-5 text-sm font-bold text-white bg-[#2f1362] text-center min-w-[130px]">ZABY</th>
                <th className="px-6 py-5 text-sm font-bold text-[#525252] text-center min-w-[140px]">HackerRank</th>
                <th className="px-6 py-5 text-sm font-bold text-[#525252] text-center min-w-[140px]">Mercer | Mettl</th>
                <th className="px-6 py-5 text-sm font-bold text-[#525252] text-center min-w-[140px]">Codility</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="border-b border-[#e5e5e5]/60 hover:bg-[#FAF9F6]/40 transition-colors">
                  <td className="px-6 py-4.5 text-sm font-semibold text-[#171717]">{row.feature}</td>
                  
                  {/* ZABY Column (Highlighted) */}
                  <td className="px-6 py-4.5 bg-[#2f1362]/05 border-x border-[#2f1362]/10 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5d0fe] border border-[#e879f9]/20 text-[#2f1362] text-xs font-bold">
                      <Check className="h-3.5 w-3.5 text-[#d946ef] stroke-[3px]" />
                      {row.zaby}
                    </div>
                  </td>

                  {/* Other Columns */}
                  <td className="px-6 py-4.5 text-center text-xs font-medium text-[#525252]">
                    {row.hackerrank === "No" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-600">
                        <X className="h-3 w-3 stroke-[2.5px]" /> No
                      </span>
                    ) : row.hackerrank.includes("Limited") || row.hackerrank.includes("Partial") ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-600">
                        {row.hackerrank}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-600">
                        {row.hackerrank}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4.5 text-center text-xs font-medium text-[#525252]">
                    {row.mettl === "No" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-600">
                        <X className="h-3 w-3 stroke-[2.5px]" /> No
                      </span>
                    ) : row.mettl.includes("Limited") || row.mettl.includes("Partial") ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-600">
                        {row.mettl}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-600">
                        {row.mettl}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4.5 text-center text-xs font-medium text-[#525252]">
                    {row.codility === "No" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-600">
                        <X className="h-3 w-3 stroke-[2.5px]" /> No
                      </span>
                    ) : row.codility.includes("Limited") || row.codility.includes("Partial") || row.codility.includes("High") ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-600">
                        {row.codility}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-600">
                        {row.codility}
                      </span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
