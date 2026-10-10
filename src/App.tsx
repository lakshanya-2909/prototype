/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  DeviceType, ViewMode, ScreenId, TransitionType, 
  UserTestTask, CommentPin, DesignIteration, TapCoordinate 
} from './types';
import { 
  SCREEN_SPECS, INITIAL_CONNECTIONS, INITIAL_TEST_TASKS, 
  INITIAL_COMMENTS, INITIAL_ITERATIONS 
} from './data/initialData';
import { Header } from './components/Header';
import { DeviceFrame } from './components/DeviceFrame';
import { FlowGraph } from './components/FlowGraph';
import { UserTestingPanel } from './components/UserTestingPanel';
import { FeedbackRefinementHub } from './components/FeedbackRefinementHub';
import { TaskTutorialModal } from './components/TaskTutorialModal';
import { PresentationModal } from './components/PresentationModal';
import { ExportModal } from './components/ExportModal';
import { 
  Smartphone, Monitor, Tablet, Eye, Split, Layout, 
  Grid, HelpCircle, Sparkles, RefreshCw, ChevronRight,
  Flame, BookOpen, Layers, CheckCircle2, SlidersHorizontal
} from 'lucide-react';

export default function App() {
  // Navigation & Screen selection
  const [currentScreenId, setCurrentScreenId] = useState<ScreenId>('welcome');
  const [history, setHistory] = useState<ScreenId[]>(['welcome']);

  // View & Device settings
  const [deviceType, setDeviceType] = useState<DeviceType>('iphone-16-pro');
  const [viewMode, setViewMode] = useState<ViewMode>('hifi');
  const [scalePercent, setScalePercent] = useState<number>(100);
  const [showHotspotHints, setShowHotspotHints] = useState<boolean>(false);
  const [showGridOverlay, setShowGridOverlay] = useState<boolean>(false);

  // Transitions & Motion
  const [selectedTransition, setSelectedTransition] = useState<TransitionType>('smart-animate');
  const [transitionDuration, setTransitionDuration] = useState<number>(300);

  // Studio Active Tab
  const [activeSection, setActiveSection] = useState<'prototype' | 'comparison' | 'flows' | 'testing' | 'refinements'>('prototype');

  // Usability Testing State
  const [tasks, setTasks] = useState<UserTestTask[]>(INITIAL_TEST_TASKS);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(INITIAL_TEST_TASKS[0].id);
  const [totalTaps, setTotalTaps] = useState<number>(0);
  const [misclicks, setMisclicks] = useState<number>(0);
  const [heatmapCoords, setHeatmapCoords] = useState<TapCoordinate[]>([]);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);

  // Feedback & Pins State
  const [comments, setComments] = useState<CommentPin[]>(INITIAL_COMMENTS);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [isPinningMode, setIsPinningMode] = useState<boolean>(false);

  // Modals
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Navigate handler with screen transition
  const handleNavigate = (target: ScreenId) => {
    setHistory((prev) => [...prev, target]);
    setCurrentScreenId(target);

    // Auto verify task completion if user reaches task objective
    if (activeTaskId) {
      const task = tasks.find((t) => t.id === activeTaskId);
      if (task && task.status === 'in-progress' && task.targetScreenId === target) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === activeTaskId ? { ...t, status: 'completed' } : t
          )
        );
      }
    }
  };

  const handleResetPrototype = () => {
    setCurrentScreenId('welcome');
    setHistory(['welcome']);
  };

  // Record tap coordinate
  const handleRecordTap = (xPercent: number, yPercent: number, isHotspot: boolean) => {
    setTotalTaps((prev) => prev + 1);
    if (!isHotspot) {
      setMisclicks((prev) => prev + 1);
      if (activeTaskId) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === activeTaskId ? { ...t, misclicks: t.misclicks + 1 } : t
          )
        );
      }
    }

    setHeatmapCoords((prev) => [
      ...prev,
      {
        id: `tap-${Date.now()}-${Math.random()}`,
        screenId: currentScreenId,
        x: xPercent,
        y: yPercent,
        isHotspot,
        timestamp: Date.now()
      }
    ]);
  };

  // Task actions
  const handleSelectTask = (taskId: string) => {
    setActiveTaskId(taskId);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: 'in-progress' } : t
      )
    );
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: 'completed' } : t
      )
    );
  };

  const handleResetTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: 'pending', timeSpentSec: 0, misclicks: 0 } : t
      )
    );
  };

  // Feedback pin actions
  const handleCreatePin = (coords: { xPercent: number; yPercent: number }) => {
    const newPin: CommentPin = {
      id: `pin-${Date.now()}`,
      screenId: currentScreenId,
      xPercent: coords.xPercent,
      yPercent: coords.yPercent,
      authorName: 'You (Intern UX Designer)',
      authorRole: 'Intern',
      content: 'Identified opportunity for alignment and thumb-zone optimization.',
      severity: 'minor-ui',
      timestamp: 'Just now',
      resolved: false
    };
    setComments((prev) => [...prev, newPin]);
    setSelectedPinId(newPin.id);
    setIsPinningMode(false);
  };

  const handleToggleResolve = (pinId: string) => {
    setComments((prev) =>
      prev.map((p) =>
        p.id === pinId ? { ...p, resolved: !p.resolved } : p
      )
    );
  };

  const handleAddComment = (commentData: Omit<CommentPin, 'id' | 'timestamp'>) => {
    const newPin: CommentPin = {
      ...commentData,
      id: `pin-${Date.now()}`,
      timestamp: 'Just now'
    };
    setComments((prev) => [...prev, newPin]);
    setSelectedPinId(newPin.id);
  };

  // Active screen spec
  const currentSpec = SCREEN_SPECS.find((s) => s.id === currentScreenId) || SCREEN_SPECS[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-neutral-950">
      {/* Universal Top Bar */}
      <Header
        activeSection={activeSection}
        onSelectSection={(sec) => {
          setActiveSection(sec);
          if (sec === 'comparison') setViewMode('split');
          if (sec === 'prototype') setViewMode('hifi');
        }}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onOpenPresentation={() => setIsPresentationOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Studio Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-8">
        
        {/* Workspace Toolbar: Screen Selector, Fidelity Switch, Device & Canvas Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm">
          {/* Left: Screen Sequence Breadcrumbs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-mono text-neutral-400 mr-2 shrink-0">Stage:</span>
            {SCREEN_SPECS.map((screen, idx) => (
              <button
                key={screen.id}
                onClick={() => handleNavigate(screen.id)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  currentScreenId === screen.id
                    ? 'bg-neutral-800 text-white font-semibold ring-1 ring-emerald-500/50'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                }`}
              >
                <span className="font-mono text-[10px] text-emerald-400">0{idx + 1}</span>
                <span>{screen.name.split('. ')[1]}</span>
              </button>
            ))}
          </div>

          {/* Right: Fidelity View Mode & Inspector Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode: Hi-Fi / Wireframe / Split */}
            <div className="flex items-center p-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs">
              <button
                onClick={() => setViewMode('hifi')}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'hifi' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hi-Fi Prototype</span>
              </button>

              <button
                onClick={() => setViewMode('wireframe')}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'wireframe' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Layout className="w-3.5 h-3.5 text-amber-400" />
                <span>Lo-Fi Wireframe</span>
              </button>

              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'split' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Split className="w-3.5 h-3.5 text-indigo-400" />
                <span>Split Comparison</span>
              </button>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center p-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs">
              <button
                onClick={() => setDeviceType('iphone-16-pro')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  deviceType === 'iphone-16-pro' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                }`}
                title="iPhone 16 Pro Frame"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceType('pixel-9')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  deviceType === 'pixel-9' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                }`}
                title="Google Pixel 9 Frame"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceType('frameless')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  deviceType === 'frameless' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                }`}
                title="Frameless Canvas"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            {/* Hotspot hints toggle */}
            <button
              onClick={() => setShowHotspotHints(!showHotspotHints)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                showHotspotHints 
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' 
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
              title="Highlight Clickable Hotspots"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Hotspots</span>
            </button>

            {/* 8pt Grid Overlay Toggle */}
            <button
              onClick={() => setShowGridOverlay(!showGridOverlay)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                showGridOverlay 
                  ? 'bg-sky-500/20 text-sky-400 border-sky-500/40' 
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
              title="8pt Grid Overlay"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">8pt Grid</span>
            </button>

            {/* Reset Prototype */}
            <button
              onClick={handleResetPrototype}
              className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Reset prototype flow to Start"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* PRIMARY VIEWPORT: SIDE-BY-SIDE PROTOTYPE SIMULATOR & UX INSPECTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center: Interactive Device Simulator Canvas (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-neutral-900/60 to-neutral-950 border border-neutral-800/80 rounded-3xl min-h-[920px] relative">
            {/* Stage Info Header */}
            <div className="w-full flex items-center justify-between pb-4 mb-2 border-b border-neutral-800/60 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-semibold text-white">{currentSpec.name}</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-400 font-mono text-[11px] capitalize">{viewMode} Mode</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px]">
                <span>SCALE: {scalePercent}%</span>
                <button
                  onClick={() => setScalePercent(scalePercent === 100 ? 90 : 100)}
                  className="hover:text-white underline cursor-pointer ml-1"
                >
                  {scalePercent === 100 ? 'Fit' : '100%'}
                </button>
              </div>
            </div>

            {/* The Clickable Prototype Device Frame */}
            <DeviceFrame
              deviceType={deviceType}
              viewMode={viewMode}
              currentScreenId={currentScreenId}
              onNavigate={handleNavigate}
              commentPins={comments}
              selectedPinId={selectedPinId}
              onSelectPin={(id) => {
                setSelectedPinId(id);
                setActiveSection('refinements');
              }}
              isPinningMode={isPinningMode}
              onCreatePin={handleCreatePin}
              showHotspotHints={showHotspotHints}
              showGridOverlay={showGridOverlay}
              heatmapCoords={heatmapCoords}
              showHeatmap={showHeatmap}
              onRecordTap={handleRecordTap}
              scalePercent={scalePercent}
            />

            {/* Prototype Interaction Hint */}
            <div className="mt-4 text-center text-xs text-neutral-400 font-mono">
              Tip: Click any interactive button, card, or tab inside the screen to navigate. Hold or toggle "Hotspots" to see clickable areas.
            </div>
          </div>

          {/* Right: Contextual UX Inspector & Screen Specifications (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Current Screen Specification Card */}
            <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                  SCREEN SPECIFICATION
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {currentSpec.dimensions.width} × {currentSpec.dimensions.height} PT
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{currentSpec.name}</h3>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  {currentSpec.description}
                </p>
              </div>

              {/* Architectural Wireframe Translation Notes */}
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <div className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Wireframe Translation Rationale</span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-400">
                  {currentSpec.wireframeNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Navigation Action Dock */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Direct Navigation:</span>
                <div className="flex items-center gap-1.5">
                  {currentScreenId !== 'welcome' && (
                    <button
                      onClick={() => handleNavigate('welcome')}
                      className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-xs transition-colors cursor-pointer"
                    >
                      Restart Flow
                    </button>
                  )}
                  {currentScreenId !== 'confirmation' && (
                    <button
                      onClick={() => {
                        const idx = SCREEN_SPECS.findIndex(s => s.id === currentScreenId);
                        if (idx < SCREEN_SPECS.length - 1) {
                          handleNavigate(SCREEN_SPECS[idx + 1].id);
                        }
                      }}
                      className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded text-xs transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Next Stage</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Testing Task Widget */}
            <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                  ACTIVE TEST OBJECTIVE
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  Mis-clicks: {misclicks}
                </span>
              </div>
              <div className="text-xs text-neutral-200 leading-relaxed">
                {tasks.find(t => t.id === activeTaskId)?.instruction || 'Select a test task to begin evaluation.'}
              </div>
              <div className="pt-1 flex items-center justify-between">
                <button
                  onClick={() => setActiveSection('testing')}
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Usability Testing Lab →</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: NAVIGATION FLOWS & TRANSITIONS CANVAS */}
        <section id="flows" className="space-y-4 pt-4">
          <FlowGraph
            currentScreenId={currentScreenId}
            onSelectScreen={handleNavigate}
            connections={INITIAL_CONNECTIONS}
            selectedTransition={selectedTransition}
            onUpdateTransition={setSelectedTransition}
            transitionDuration={transitionDuration}
            onUpdateDuration={setTransitionDuration}
          />
        </section>

        {/* SECTION 3: USABILITY TESTING LAB & SUS BENCHMARK */}
        <section id="testing" className="space-y-4 pt-4">
          <UserTestingPanel
            tasks={tasks}
            activeTaskId={activeTaskId}
            onSelectTask={handleSelectTask}
            onCompleteTask={handleCompleteTask}
            onResetTask={handleResetTask}
            currentScreenId={currentScreenId}
            totalTaps={totalTaps}
            misclicks={misclicks}
            showHeatmap={showHeatmap}
            onToggleHeatmap={setShowHeatmap}
          />
        </section>

        {/* SECTION 4: FEEDBACK PINS & DESIGN ITERATION CHANGELOG */}
        <section id="refinements" className="space-y-4 pt-4">
          <FeedbackRefinementHub
            comments={comments}
            selectedPinId={selectedPinId}
            onSelectPin={setSelectedPinId}
            onToggleResolve={handleToggleResolve}
            onAddComment={handleAddComment}
            isPinningMode={isPinningMode}
            onTogglePinningMode={() => setIsPinningMode(!isPinningMode)}
            currentScreenId={currentScreenId}
          />
        </section>

      </main>

      {/* Internship Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-950 py-8 px-6 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-neutral-400 font-semibold">AuraCraft Studio</span> — UI/UX Internship Interactive Prototyping Task
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsTutorialOpen(true)} className="hover:text-neutral-300 transition-colors cursor-pointer">
              Task Tutorial
            </button>
            <button onClick={() => setIsPresentationOpen(true)} className="hover:text-neutral-300 transition-colors cursor-pointer">
              Presentation Deck
            </button>
            <button onClick={() => setIsExportOpen(true)} className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer">
              Export Dossier (.md / .json)
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <TaskTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />

      <PresentationModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        onJumpToScreen={handleNavigate}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        tasks={tasks}
        comments={comments}
        iterations={INITIAL_ITERATIONS}
        susScore={87.5}
      />
    </div>
  );
}
