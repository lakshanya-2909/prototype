import React, { useState } from 'react';
import { X, PlayCircle, BookOpen, Layers, Zap, Users, RotateCcw, Check, ChevronRight, ChevronLeft } from 'lucide-react';

interface TaskTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TaskTutorialModal: React.FC<TaskTutorialModalProps> = ({
  isOpen,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: '01. Wireframe to Interactive Prototype',
      subtitle: 'Mapping structural architecture to clickable fidelities in Figma or InVision',
      icon: Layers,
      content: (
        <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
          <p>
            When transitioning from low-fidelity wireframes to an interactive prototype, the goal is not merely adding color—it is translating structural layout containers into functional interactive components:
          </p>
          <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg space-y-2">
            <div className="font-semibold text-white">Core Translation Principles:</div>
            <ul className="list-disc list-inside space-y-1 text-neutral-300">
              <li><strong className="text-emerald-400">Layout Grids:</strong> Maintain strict 8pt grid alignment so component touch targets never shift between wireframe and prototype.</li>
              <li><strong className="text-emerald-400">Touch Target Math:</strong> Ensure interactive elements have ≥ 44×44pt hit areas, especially in mobile thumb zones.</li>
              <li><strong className="text-emerald-400">Component Hierarchy:</strong> Wireframe boxes with X-crossings become hero visual cards with measured contrast scrims.</li>
            </ul>
          </div>
          <p>
            Use the <strong>Wireframe vs. Hi-Fi toggle</strong> in this studio to inspect how layout bones correspond directly to final interactive states.
          </p>
        </div>
      )
    },
    {
      title: '02. Animations, Transitions & Navigation Flows',
      subtitle: 'Configuring triggers, easing curves, and spatial continuity',
      icon: Zap,
      content: (
        <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
          <p>
            Static screens cannot test cognitive continuity. Adding micro-interactions and transitions teaches the user mental model of the system:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Smart Animate (300-350ms)</span>
              <p className="text-[11px] text-neutral-300">Interpolates matching layer names (e.g. card expands into detail hero without harsh jumping).</p>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Push / Slide Left (250-300ms)</span>
              <p className="text-[11px] text-neutral-300">Communicates hierarchical forward navigation in mobile navigation stacks.</p>
            </div>
          </div>
          <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300">
            <strong>Micro-Interaction Physics:</strong> Button presses and favorite hearts must respond in ≤ 120ms with spring settling physics (<code className="text-emerald-400">cubic-bezier(0.16, 1, 0.3, 1)</code>) to confirm reception.
          </div>
        </div>
      )
    },
    {
      title: '03. Conducting Quick User Testing',
      subtitle: 'Structuring tasks, tracking mis-clicks, and calculating SUS scores',
      icon: Users,
      content: (
        <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
          <p>
            Conducting quick user testing validates whether real participants can achieve their goals without supervisor coaching:
          </p>
          <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg space-y-2">
            <div className="font-semibold text-white">Three-Tier Testing Protocol:</div>
            <ol className="list-decimal list-inside space-y-1 text-neutral-300">
              <li><strong>Discovery Task:</strong> Ask the user to find a specific sanctuary without telling them where to tap.</li>
              <li><strong>Transaction Task:</strong> Observe if date & guest steppers cause confusion or accidental exits.</li>
              <li><strong>Verification Task:</strong> Check whether the confirmation QR pass provides sufficient closure.</li>
            </ol>
          </div>
          <p>
            Measure quantitative metrics: <strong>Time on Task</strong>, <strong>Mis-click Count</strong>, and standard <strong>System Usability Scale (SUS)</strong> index. A score above 80 points denotes Grade A usability.
          </p>
        </div>
      )
    },
    {
      title: '04. Gathering Feedback & Iterating Designs',
      subtitle: 'Pinpoint critique, triage severity, and document the before/after story',
      icon: RotateCcw,
      content: (
        <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
          <p>
            The difference between junior and senior designers is how they close the feedback loop:
          </p>
          <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg space-y-2">
            <div className="font-semibold text-white">The Iteration Equation:</div>
            <p className="font-mono text-emerald-400 text-xs">
              Observation Flaw → Usability Metric Insight → Concrete UI Fix → Validated Outcome
            </p>
          </div>
          <p>
            Use the <strong>Pin Commenting System</strong> in this studio to attach annotations directly to screen coordinates, and review the <strong>Design Iteration Changelog</strong> to demonstrate quantitative improvement.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Internship Task Tutorial & Methodology</h2>
              <p className="text-[11px] text-neutral-400">Interactive Prototyping & Testing Masterclass</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 shrink-0">
              {React.createElement(steps[currentStep].icon, { className: 'w-5 h-5' })}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{steps[currentStep].title}</h3>
              <p className="text-xs text-neutral-400">{steps[currentStep].subtitle}</p>
            </div>
          </div>

          <div className="pt-2">
            {steps[currentStep].content}
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentStep === 0 ? 'text-neutral-600 cursor-not-allowed' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentStep === idx ? 'w-5 bg-emerald-400' : 'bg-neutral-700'
                }`}
              />
            ))}
          </div>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
              className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-xs rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-xs rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Start Prototyping</span>
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
