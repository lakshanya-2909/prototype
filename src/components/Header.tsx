import React from 'react';
import { PlayCircle, Download, BookOpen, Presentation } from 'lucide-react';

interface HeaderProps {
  activeSection: 'prototype' | 'comparison' | 'flows' | 'testing' | 'refinements';
  onSelectSection: (section: 'prototype' | 'comparison' | 'flows' | 'testing' | 'refinements') => void;
  onOpenTutorial: () => void;
  onOpenPresentation: () => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  onOpenTutorial,
  onOpenPresentation,
  onOpenExport
}) => {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectSection('prototype');
          }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors"
        >
          AuraCraft Studio
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-400">
          <button
            onClick={() => onSelectSection('prototype')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              activeSection === 'prototype' ? 'text-white font-semibold' : ''
            }`}
          >
            Interactive Prototype
          </button>
          <button
            onClick={() => onSelectSection('comparison')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              activeSection === 'comparison' ? 'text-white font-semibold' : ''
            }`}
          >
            Wireframe vs. Hi-Fi
          </button>
          <button
            onClick={() => onSelectSection('flows')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              activeSection === 'flows' ? 'text-white font-semibold' : ''
            }`}
          >
            Navigation Flows
          </button>
          <button
            onClick={() => onSelectSection('testing')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              activeSection === 'testing' ? 'text-white font-semibold' : ''
            }`}
          >
            Usability Testing
          </button>
          <button
            onClick={() => onSelectSection('refinements')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              activeSection === 'refinements' ? 'text-white font-semibold' : ''
            }`}
          >
            Design Refinements
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenTutorial}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Watch Tutorial</span>
          </button>

          <button
            onClick={onOpenPresentation}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Presentation className="w-3.5 h-3.5 text-indigo-400" />
            <span>Present Deck</span>
          </button>

          <button
            onClick={onOpenExport}
            className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Deliverables</span>
          </button>
        </div>
      </div>
    </header>
  );
};
