import React, { useState } from 'react';
import { X, Copy, Download, Check, FileText, Code } from 'lucide-react';
import { UserTestTask, CommentPin, DesignIteration } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: UserTestTask[];
  comments: CommentPin[];
  iterations: DesignIteration[];
  susScore: number;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  tasks,
  comments,
  iterations,
  susScore
}) => {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'markdown' | 'json'>('markdown');

  if (!isOpen) return null;

  const markdownContent = `# UI/UX Internship Deliverable: Interactive Prototype & Usability Testing Report
**Project Name:** Aura Haven — Zero-Carbon Travel & Sanctuaries Mobile App  
**Role:** UI/UX Design Intern  
**Objective:** Convert low-fidelity wireframes into an interactive prototype, configure transitions, execute usability testing, and implement evidence-based design refinements.

---

## 1. Executive Summary & Problem Framing
The objective was to solve discovery and conversion friction in eco-travel bookings by transforming static wireframes into a high-fidelity interactive prototype. Through structured user testing and empirical analysis, key friction points were resolved, achieving an exceptional **System Usability Scale (SUS) score of ${susScore}/100 (Grade A)**.

---

## 2. Interactive Navigation Flows & Micro-Interactions
- **Screen 01 (Welcome / Onboarding):** Hero value proposition with single-action conversion CTA (\`393x852pt\`).
- **Screen 02 (Curated Sanctuaries Feed):** Client-side category filtering and tactile bookmark micro-interaction with \`120ms\` spring scale feedback.
- **Screen 03 (Nordic Cliff Sanctuary Detail):** Persistent 72px floating bottom action dock ensuring the booking trigger is never scrolled out of view.
- **Screen 04 (Interactive Reservation Drawer):** Bottom sheet modal with dynamic date range selection, capacity stepper (+/-), and upfront itemized pricing.
- **Screen 05 (Verified Digital Pass):** Post-booking confirmation with high-contrast scannable QR arrival pass and verified carbon offset ledger.

---

## 3. Usability Testing Protocol & Quantitative Findings
- **Total Testing Tasks Evaluated:** ${tasks.length}
- **Task Completion Rate:** ${Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}%
- **System Usability Scale (SUS) Score:** ${susScore} / 100
- **Industry Usability Benchmark:** Top 10% (Grade A - Excellent)

### Task Breakdown:
${tasks.map(t => `- **Task 0${t.taskNumber} (${t.title}):** ${t.instruction}\n  - *Success Criteria:* ${t.successCriteria}\n  - *Status:* ${t.status.toUpperCase()}`).join('\n')}

---

## 4. Stakeholder Feedback & Resolution Matrix
Total feedback pins recorded: ${comments.length} (${comments.filter(c => c.resolved).length} resolved)

${comments.map((c, idx) => `### Pin #${idx + 1}: ${c.authorName} (${c.authorRole}) — ${c.severity.toUpperCase()}
- **Screen:** ${c.screenId}
- **Critique:** "${c.content}"
- **Resolution:** ${c.resolved ? (c.resolutionNote || 'Resolved') : 'Pending Review'}
`).join('\n')}

---

## 5. Documented Design Iterations (Before & After)
${iterations.map((iter, idx) => `### Iteration 0${idx + 1}: ${iter.title}
- **Before Flaw (Wireframe):** ${iter.beforeProblem}
- **Tester Insight:** ${iter.testingInsight}
- **After Solution (Prototype):** ${iter.afterSolution}
- **Quantitative Impact:** ${iter.metricsImpact}
`).join('\n')}

---

*Prepared for UI/UX Internship Evaluation Dossier.*
`;

  const jsonContent = JSON.stringify({
    project: "Aura Haven UI/UX Internship Prototype",
    role: "UI/UX Design Intern",
    date: new Date().toISOString(),
    susScore,
    tasks,
    comments,
    iterations
  }, null, 2);

  const handleCopy = () => {
    const text = exportFormat === 'markdown' ? markdownContent : jsonContent;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = exportFormat === 'markdown' ? markdownContent : jsonContent;
    const blob = new Blob([text], { type: exportFormat === 'markdown' ? 'text/markdown' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = exportFormat === 'markdown' ? 'internship_ux_report.md' : 'internship_ux_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Export Internship Deliverables Package</h3>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="px-6 pt-4 flex items-center justify-between">
          <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs">
            <button
              onClick={() => setExportFormat('markdown')}
              className={`px-3 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                exportFormat === 'markdown' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Markdown Dossier (.md)
            </button>
            <button
              onClick={() => setExportFormat('json')}
              className={`px-3 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                exportFormat === 'json' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Raw Usability JSON (.json)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Text Preview Area */}
        <div className="p-6 overflow-y-auto">
          <pre className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-mono text-neutral-300 whitespace-pre-wrap max-h-96 overflow-y-auto leading-relaxed select-all">
            {exportFormat === 'markdown' ? markdownContent : jsonContent}
          </pre>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span>Complete formatted internship deliverable ready for supervisor review.</span>
          <button onClick={onClose} className="text-white hover:underline cursor-pointer">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
