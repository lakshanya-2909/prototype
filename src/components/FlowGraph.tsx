import React from 'react';
import { ScreenId, TransitionType, NavigationConnection } from '../types';
import { SCREEN_SPECS } from '../data/initialData';
import { ArrowRight, Sparkles, Play, Sliders } from 'lucide-react';

interface FlowGraphProps {
  currentScreenId: ScreenId;
  onSelectScreen: (screenId: ScreenId) => void;
  connections: NavigationConnection[];
  selectedTransition: TransitionType;
  onUpdateTransition: (transition: TransitionType) => void;
  transitionDuration: number;
  onUpdateDuration: (duration: number) => void;
}

export const FlowGraph: React.FC<FlowGraphProps> = ({
  currentScreenId,
  onSelectScreen,
  connections,
  selectedTransition,
  onUpdateTransition,
  transitionDuration,
  onUpdateDuration
}) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-6">
      {/* Header & Flow Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <span>Interactive Navigation Flow Canvas</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Architectural screen sequence, connection triggers, and micro-interaction transition physics.
          </p>
        </div>

        {/* Global Transition Settings Segmented Control */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs">
            <span className="text-[11px] text-neutral-400 px-2">Transition:</span>
            {(['smart-animate', 'slide-left', 'dissolve', 'instant'] as TransitionType[]).map((t) => (
              <button
                key={t}
                onClick={() => onUpdateTransition(t)}
                className={`px-2.5 py-1 rounded text-xs capitalize transition-colors cursor-pointer ${
                  selectedTransition === t
                    ? 'bg-neutral-800 text-emerald-400 font-medium'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {t.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <span className="text-neutral-400">Duration:</span>
            <select
              value={transitionDuration}
              onChange={(e) => onUpdateDuration(Number(e.target.value))}
              aria-label="Transition Duration"
              className="bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-emerald-400 outline-none"
            >
              <option value={150}>150ms (Snappy)</option>
              <option value={300}>300ms (Default)</option>
              <option value={450}>450ms (Cinematic)</option>
              <option value={600}>600ms (Slow-Mo)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Screen Sequence Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {SCREEN_SPECS.map((screen, idx) => {
          const isActive = currentScreenId === screen.id;
          return (
            <div
              key={screen.id}
              onClick={() => onSelectScreen(screen.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                isActive
                  ? 'bg-neutral-800/90 border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500'
                  : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {/* Step number & Category */}
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2">
                <span>0{idx + 1}</span>
                <span className="capitalize">{screen.category}</span>
              </div>

              {/* Title & Preview */}
              <h4 className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                {screen.name.split('. ')[1]}
              </h4>
              <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                {screen.description}
              </p>

              {/* Status indicator */}
              <div className="mt-3 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono">
                <span className={isActive ? 'text-emerald-400 font-semibold' : 'text-neutral-500'}>
                  {isActive ? '● ACTIVE STAGE' : 'Click to preview'}
                </span>
                <span className="text-neutral-500">393x852</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connections Trigger Specification Table */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
          Interaction Specifications & Hotspots ({connections.length})
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-neutral-800 rounded-lg overflow-hidden font-mono">
            <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800 text-[11px]">
              <tr>
                <th className="py-2 px-3">Connection</th>
                <th className="py-2 px-3">From Screen</th>
                <th className="py-2 px-3">Action Trigger</th>
                <th className="py-2 px-3">Destination</th>
                <th className="py-2 px-3">Animation Curve</th>
                <th className="py-2 px-3 text-right">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              {connections.map((conn) => (
                <tr key={conn.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-2 px-3 text-white font-medium">{conn.label}</td>
                  <td className="py-2 px-3 text-neutral-400 capitalize">{conn.fromScreen}</td>
                  <td className="py-2 px-3 text-emerald-400">{conn.trigger}</td>
                  <td className="py-2 px-3 text-neutral-400 capitalize">{conn.toScreen}</td>
                  <td className="py-2 px-3 text-neutral-300">{conn.transition}</td>
                  <td className="py-2 px-3 text-right text-neutral-400 tabular-nums">{conn.durationMs}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
