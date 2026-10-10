import React, { useState } from 'react';
import { CommentPin, DesignIteration, ScreenId } from '../types';
import { INITIAL_ITERATIONS } from '../data/initialData';
import { MessageSquare, CheckCircle, Plus, Filter, Sparkles, AlertTriangle, Lightbulb, Check } from 'lucide-react';

interface FeedbackRefinementHubProps {
  comments: CommentPin[];
  selectedPinId: string | null;
  onSelectPin: (pinId: string) => void;
  onToggleResolve: (pinId: string) => void;
  onAddComment: (comment: Omit<CommentPin, 'id' | 'timestamp'>) => void;
  isPinningMode: boolean;
  onTogglePinningMode: () => void;
  currentScreenId: ScreenId;
}

export const FeedbackRefinementHub: React.FC<FeedbackRefinementHubProps> = ({
  comments,
  selectedPinId,
  onSelectPin,
  onToggleResolve,
  onAddComment,
  isPinningMode,
  onTogglePinningMode,
  currentScreenId
}) => {
  const [activeTab, setActiveTab] = useState<'comments' | 'iterations'>('comments');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'blocker' | 'major-usability' | 'minor-ui' | 'suggestion'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newRole, setNewRole] = useState<'UX Lead' | 'Design Mentor' | 'Product Manager' | 'User Tester' | 'Intern'>('Intern');
  const [newSeverity, setNewSeverity] = useState<'blocker' | 'major-usability' | 'minor-ui' | 'suggestion'>('major-usability');

  const filteredComments = comments.filter((c) => {
    if (severityFilter === 'all') return true;
    return c.severity === severityFilter;
  });

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    onAddComment({
      screenId: currentScreenId,
      xPercent: 50,
      yPercent: 50,
      authorName: 'You (Intern UX Designer)',
      authorRole: newRole,
      content: newContent.trim(),
      severity: newSeverity,
      resolved: false
    });

    setNewContent('');
    setShowAddForm(false);
  };

  const getSeverityBadge = (sev: CommentPin['severity']) => {
    switch (sev) {
      case 'blocker':
        return <span className="text-rose-400 font-mono text-[10px] uppercase font-bold">Blocker</span>;
      case 'major-usability':
        return <span className="text-amber-400 font-mono text-[10px] uppercase font-semibold">Major UX</span>;
      case 'minor-ui':
        return <span className="text-blue-400 font-mono text-[10px] uppercase">Minor UI</span>;
      case 'suggestion':
        return <span className="text-emerald-400 font-mono text-[10px] uppercase">Suggestion</span>;
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-6">
      {/* Tab Switcher & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <span>Feedback & Refinement Hub</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Stakeholder critique pins, usability test feedback, and documented design iteration changes.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-3 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                activeTab === 'comments' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Feedback Pins ({comments.length})
            </button>
            <button
              onClick={() => setActiveTab('iterations')}
              className={`px-3 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                activeTab === 'iterations' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Design Iterations (3)
            </button>
          </div>

          {activeTab === 'comments' && (
            <button
              onClick={onTogglePinningMode}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
                isPinningMode
                  ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400 ring-2 ring-amber-400/30'
                  : 'bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isPinningMode ? 'Click Screen to Drop Pin' : 'Drop Pin on Screen'}</span>
            </button>
          )}
        </div>
      </div>

      {/* FEEDBACK PINS TAB */}
      {activeTab === 'comments' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-neutral-500 text-[11px]">Severity:</span>
              {(['all', 'blocker', 'major-usability', 'minor-ui', 'suggestion'] as const).map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2.5 py-1 rounded text-[11px] capitalize transition-colors cursor-pointer ${
                    severityFilter === sev
                      ? 'bg-neutral-800 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {sev.replace('-', ' ')}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Quick Feedback Note</span>
            </button>
          </div>

          {/* Quick Add Feedback Form */}
          {showAddForm && (
            <form onSubmit={handleCreateComment} className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span className="font-semibold">Log New Feedback for Screen: <span className="text-emerald-400 font-mono capitalize">{currentScreenId}</span></span>
                <button type="button" onClick={() => setShowAddForm(false)} className="text-neutral-500 hover:text-white">✕</button>
              </div>

              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Describe usability issue, contrast concern, or user testing observation..."
                rows={2}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-emerald-500"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs">
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-neutral-300 text-xs"
                  >
                    <option value="Intern">Role: Intern Designer</option>
                    <option value="UX Lead">Role: UX Lead</option>
                    <option value="Design Mentor">Role: Design Mentor</option>
                    <option value="User Tester">Role: User Tester</option>
                  </select>

                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-neutral-300 text-xs"
                  >
                    <option value="major-usability">Major UX</option>
                    <option value="blocker">Blocker</option>
                    <option value="minor-ui">Minor UI</option>
                    <option value="suggestion">Suggestion</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-500 text-neutral-950 text-xs font-semibold rounded-lg hover:bg-emerald-400 cursor-pointer"
                >
                  Save Feedback Pin
                </button>
              </div>
            </form>
          )}

          {/* Comments List */}
          <div className="space-y-3">
            {filteredComments.map((pin, idx) => {
              const isSelected = selectedPinId === pin.id;
              return (
                <div
                  key={pin.id}
                  onClick={() => onSelectPin(pin.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-800/90 border-amber-400/80 shadow-md ring-1 ring-amber-400/40'
                      : pin.resolved
                      ? 'bg-neutral-950/40 border-neutral-800/80 opacity-75'
                      : 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono ${
                        pin.resolved ? 'bg-neutral-700 text-neutral-300' : 'bg-rose-500 text-white'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-white">{pin.authorName}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">({pin.authorRole})</span>
                      <span className="text-neutral-500">·</span>
                      <span className="text-[10px] text-neutral-400 font-mono capitalize">{pin.screenId} screen</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {getSeverityBadge(pin.severity)}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleResolve(pin.id);
                        }}
                        className={`text-xs px-2 py-0.5 rounded transition-colors cursor-pointer ${
                          pin.resolved
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[10px]'
                            : 'text-neutral-400 hover:text-white border border-neutral-700 text-[10px]'
                        }`}
                      >
                        {pin.resolved ? '✓ Resolved' : 'Mark Resolved'}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    {pin.content}
                  </p>

                  {pin.resolutionNote && (
                    <div className="mt-2.5 p-2 bg-emerald-950/30 border border-emerald-800/40 rounded-lg text-[11px] text-emerald-300 flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">Iteration Fix: </span>
                        {pin.resolutionNote}
                      </div>
                    </div>
                  )}

                  <div className="mt-2 text-[10px] font-mono text-neutral-500">
                    Logged {pin.timestamp} · Coordinates ({pin.xPercent}%, {pin.yPercent}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DESIGN ITERATIONS TAB */}
      {activeTab === 'iterations' && (
        <div className="space-y-4">
          <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-300">
            <span className="text-emerald-400 font-semibold">Closing the Design Loop: </span>
            Every interactive prototype must evolve through verifiable user testing evidence. Below is the documented evolution from early wireframe usability flaws to high-fidelity refined solutions.
          </div>

          <div className="space-y-4">
            {INITIAL_ITERATIONS.map((iter, idx) => (
              <div key={iter.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/20">
                      ITERATION 0{idx + 1}
                    </span>
                    <h4 className="text-xs font-semibold text-white">{iter.title}</h4>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase capitalize">
                    {iter.screenId} screen
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-rose-950/20 border border-rose-900/30 rounded-lg space-y-1">
                    <div className="text-[10px] font-mono text-rose-400 font-bold uppercase">Before (Wireframe Flaw)</div>
                    <p className="text-neutral-300">{iter.beforeProblem}</p>
                    <div className="text-[10px] text-rose-300/80 pt-1 border-t border-rose-900/30">
                      Tester Insight: {iter.testingInsight}
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-lg space-y-1">
                    <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">After (Prototype Refinement)</div>
                    <p className="text-neutral-300">{iter.afterSolution}</p>
                    <div className="text-[10px] text-emerald-300/90 pt-1 border-t border-emerald-900/30 font-semibold">
                      Quantitative Result: {iter.metricsImpact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
