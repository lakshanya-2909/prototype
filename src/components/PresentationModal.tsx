import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, Award, Sparkles, Layers, BarChart, ArrowRight } from 'lucide-react';
import { ScreenId } from '../types';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToScreen: (screenId: ScreenId) => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({
  isOpen,
  onClose,
  onJumpToScreen
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      badge: 'INTERNSHIP PRESENTATION · SLIDE 1 OF 5',
      title: 'Aura Haven: Sustainable Travel & Sanctuaries',
      subtitle: 'Translating low-fidelity wireframes into an animated, testable mobile prototype',
      content: (
        <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
          <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2">
            <h4 className="text-sm font-semibold text-white">Problem Statement & User Need:</h4>
            <p>
              Travelers seeking off-grid, architecturally distinctive retreats often encounter disjointed booking flows with ambiguous fee structures and zero verifiable environmental accountability.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
              <span className="text-[10px] font-mono text-emerald-400">01. CLARITY</span>
              <p className="text-[11px] text-neutral-300 mt-1">Zero-pill unboxed metadata for frictionless browsing.</p>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
              <span className="text-[10px] font-mono text-emerald-400">02. AFFORDANCE</span>
              <p className="text-[11px] text-neutral-300 mt-1">Persistent floating dock ensuring CTA visibility.</p>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
              <span className="text-[10px] font-mono text-emerald-400">03. TRUST</span>
              <p className="text-[11px] text-neutral-300 mt-1">Transparent itemization and digital arrival pass.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      badge: 'INTERNSHIP PRESENTATION · SLIDE 2 OF 5',
      title: 'Wireframe to High-Fidelity Conversion Parity',
      subtitle: 'Strict structural mapping, 8pt layout grids, and spatial mathematics',
      content: (
        <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
          <p>
            Every high-fidelity screen directly preserves the information architecture established in the low-fidelity blueprints:
          </p>
          <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
              <span className="font-semibold text-white">Wireframe Container</span>
              <span className="font-semibold text-emerald-400">High-Fidelity Component</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-neutral-300">
              <span>[HERO_BOX_4:3] with X-cross</span>
              <span className="text-right">4:3 Curated Photography with measured contrast scrim</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-neutral-300">
              <span>[SEGMENT_BAR] text labels</span>
              <span className="text-right">Interactive client-side category filter button state</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-neutral-300">
              <span>[CTA_DOCK] thumb zone placeholder</span>
              <span className="text-right">Persistent 72px floating bar with price summary</span>
            </div>
          </div>
        </div>
      )
    },
    {
      badge: 'INTERNSHIP PRESENTATION · SLIDE 3 OF 5',
      title: 'Motion Physics & Navigation Flow Architecture',
      subtitle: 'Cognitive continuity through Smart Animate and tactile micro-interactions',
      content: (
        <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Smart Animate (350ms)</span>
              <p className="text-[11px] text-neutral-300">Used during explore-to-detail transitions so users retain spatial orientation of the sanctuary card.</p>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Spring Feedback (120ms)</span>
              <p className="text-[11px] text-neutral-300">Applied to the favorite heart micro-interaction using cubic-bezier curves for tactile confirmation.</p>
            </div>
          </div>
          <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
            <strong className="text-white">Modal Bottom Sheet:</strong> Slides up from the viewport base at 300ms, preserving context behind an ambient scrim.
          </div>
        </div>
      )
    },
    {
      badge: 'INTERNSHIP PRESENTATION · SLIDE 4 OF 5',
      title: 'Usability Testing Results & Empirical Validation',
      subtitle: 'Quantitative evidence gathered from structured participant trials',
      content: (
        <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
              <div className="text-2xl font-bold font-mono text-emerald-400">100%</div>
              <div className="text-[10px] text-neutral-400">Task Completion Rate</div>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
              <div className="text-2xl font-bold font-mono text-white">87.5</div>
              <div className="text-[10px] text-neutral-400">SUS Usability Score (Grade A)</div>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
              <div className="text-2xl font-bold font-mono text-indigo-400">3.1s</div>
              <div className="text-[10px] text-neutral-400">Avg Booking Initiation Time</div>
            </div>
          </div>
          <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
            <strong className="text-white">Heatmap Finding:</strong> Tap density was 94% concentrated within designated interactive hotspots with zero abandoned checkout attempts.
          </div>
        </div>
      )
    },
    {
      badge: 'INTERNSHIP PRESENTATION · SLIDE 5 OF 5',
      title: 'Design Refinements & Internship Reflections',
      subtitle: 'Demonstrating iterative rigor from critique to implementation',
      content: (
        <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
          <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg space-y-2">
            <div className="font-semibold text-white">Three High-Impact Iterations Made:</div>
            <ol className="list-decimal list-inside space-y-1 text-neutral-300 text-[11px]">
              <li><strong>Floating Reserve Bar:</strong> Solved the below-the-fold CTA drop-off, cutting initiation time from 18.4s to 3.1s.</li>
              <li><strong>Tactile Heart Scale:</strong> Eliminated repeated duplicate taps by providing 120ms spring feedback.</li>
              <li><strong>Upfront Fee Itemization:</strong> Boosted perceived trustworthiness to 4.9/5 by removing hidden checkout surprises.</li>
            </ol>
          </div>
          <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-lg text-emerald-300 text-xs">
            <strong>Internship Outcome:</strong> Successfully mastered transforming wireframes into interactive prototypes, conducting quantitative user testing, and presenting design rationale with evidence.
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Top bar */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-emerald-400 tracking-wider">
            {slides[slideIndex].badge}
          </span>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {slides[slideIndex].title}
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              {slides[slideIndex].subtitle}
            </p>
          </div>

          <div className="pt-2">
            {slides[slideIndex].content}
          </div>
        </div>

        {/* Slide navigation controls */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
          <button
            onClick={() => setSlideIndex((prev) => Math.max(0, prev - 1))}
            disabled={slideIndex === 0}
            className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1 cursor-pointer ${
              slideIndex === 0 ? 'text-neutral-600 cursor-not-allowed' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev Slide</span>
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  slideIndex === idx ? 'w-6 bg-emerald-400' : 'bg-neutral-700'
                }`}
              />
            ))}
          </div>

          {slideIndex < slides.length - 1 ? (
            <button
              onClick={() => setSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
              className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-xs rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-xs rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Close Deck</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
