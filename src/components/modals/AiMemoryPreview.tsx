"use client";

import { Brain, Database, Lock } from "lucide-react";

export function AiMemoryPreview() {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-purple-50 to-slate-100 p-8 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
            <Brain size={24} className="text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-medium tracking-tight">AI Memory</h1>
        </div>
        <p className="text-slate-600 text-lg">Give agents persistent memory and contextual awareness.</p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Feature 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Brain size={20} className="text-purple-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Long-Term Memory Storage</h3>
              <p className="text-sm text-slate-600">Agents retain information across sessions, learning from past interactions and decisions.</p>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Database size={20} className="text-purple-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Semantic Search & Retrieval</h3>
              <p className="text-sm text-slate-600">Quickly find relevant memories using semantic similarity, not just keyword matching.</p>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Lock size={20} className="text-purple-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Encrypted Memory & Privacy</h3>
              <p className="text-sm text-slate-600">All agent memories are encrypted and isolated by tenant, ensuring complete data privacy.</p>
            </div>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Brain size={20} className="text-purple-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Context Window Expansion</h3>
              <p className="text-sm text-slate-600">Automatically manage agent context by summarizing old memories and retrieving relevant ones.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
        <p className="text-sm text-slate-600">Enable smarter, more contextual agent behavior.</p>
        <button className="px-6 py-2.5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors">
          Enable Memory
        </button>
      </div>
    </div>
  );
}
