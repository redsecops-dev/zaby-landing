"use client";

import { GitBranch, Workflow, Zap } from "lucide-react";

export function AgenticWorkflowPreview() {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-emerald-50 to-slate-100 p-8 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center">
            <Workflow size={24} className="text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-medium tracking-tight">Agentic Workflow</h1>
        </div>
        <p className="text-slate-600 text-lg">Define complex business processes with intelligent decision-making and adaptive execution.</p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Feature 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Workflow size={20} className="text-emerald-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Visual Workflow Designer</h3>
              <p className="text-sm text-slate-600">Build complex processes using drag-and-drop interface without writing code.</p>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <GitBranch size={20} className="text-emerald-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Intelligent Branching</h3>
              <p className="text-sm text-slate-600">Workflows automatically adapt based on outcomes, conditions, and real-time data.</p>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Zap size={20} className="text-emerald-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Real-Time Error Handling</h3>
              <p className="text-sm text-slate-600">Workflows automatically handle failures, retry logic, and edge cases without intervention.</p>
            </div>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Workflow size={20} className="text-emerald-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Audit & Compliance Tracking</h3>
              <p className="text-sm text-slate-600">Complete workflow execution history with full audit trail for compliance requirements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
        <p className="text-sm text-slate-600">Automate your most complex business processes.</p>
        <button className="px-6 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors">
          Design Workflow
        </button>
      </div>
    </div>
  );
}
