"use client";

import { Network, Code, Puzzle } from "lucide-react";

export function OpenAgentsPreview() {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-blue-50 to-slate-100 p-8 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <Network size={24} className="text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-medium tracking-tight">Open Agents</h1>
        </div>
        <p className="text-slate-600 text-lg">Build and integrate custom agents with any tool or API.</p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Feature 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Code size={20} className="text-blue-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Custom Agent Builder</h3>
              <p className="text-sm text-slate-600">Create specialized agents using TypeScript or Python with full control over behavior and capabilities.</p>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Puzzle size={20} className="text-blue-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Seamless Integrations</h3>
              <p className="text-sm text-slate-600">Connect agents to any REST API, webhook, or third-party service with built-in adapters.</p>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Network size={20} className="text-blue-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Agent Marketplace</h3>
              <p className="text-sm text-slate-600">Discover, publish, and share agents with the community to accelerate development.</p>
            </div>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Code size={20} className="text-blue-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Version Control & Rollback</h3>
              <p className="text-sm text-slate-600">Track agent versions, compare changes, and rollback to previous versions instantly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
        <p className="text-sm text-slate-600">Start building your custom agents today.</p>
        <button className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
          Create Agent
        </button>
      </div>
    </div>
  );
}
