import React, { useState, useEffect } from 'react';
import { UserTestTask, ScreenId } from '../types';
import { SUS_QUESTIONS } from '../data/initialData';
import { Play, Pause, RotateCcw, CheckCircle2, AlertCircle, Flame, BarChart3, Clock, Check, HelpCircle } from 'lucide-react';

interface UserTestingPanelProps {
  tasks: UserTestTask[];
  activeTaskId: string | null;
  onSelectTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
  onResetTask: (taskId: string) => void;
  currentScreenId: ScreenId;
  totalTaps: number;
  misclicks: number;
  showHeatmap: boolean;
  onToggleHeatmap: (val: boolean) => void;
}

export const UserTestingPanel: React.FC<UserTestingPanelProps> = ({
  tasks,
  activeTaskId,
  onSelectTask,
  onCompleteTask,
  onResetTask,
  currentScreenId,
  totalTaps,
  misclicks,
  showHeatmap,
  onToggleHeatmap
}) => {
  // Timer state for active test session
  const [isRunning, setIsRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // SUS Survey state (values 1-5 for each question)
  const [showSusSurvey, setShowSusSurvey] = useState(false);
  const [susAnswers, setSusAnswers] = useState<Record<number, number>>({
    1: 4, 2: 1, 3: 5, 4: 1, 5: 4, 6: 2, 7: 5, 8: 1, 9: 4, 10: 1
  });

  const activeTask = tasks.find((t) => t.id === activeTaskId) || tasks[0];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Check if current screen matches target screen to trigger auto-completion check
  useEffect(() => {
    if (activeTask && activeTask.status === 'in-progress') {
      if (currentScreenId === activeTask.targetScreenId) {
        // Task goal reached!
      }
    }
  }, [currentScreenId, activeTask]);

  const handleStartTask = (taskId: string) => {
    onSelectTask(taskId);
    setIsRunning(true);
    setTimerSeconds(0);
  };

  const handlePauseTask = () => {
    setIsRunning(false);
  };

  const handleFinishTask = () => {
    setIsRunning(false);
    if (activeTaskId) {
      onCompleteTask(activeTaskId);
    }
  };

  // Calculate System Usability Scale (SUS) Score
  // Formula:
  // Odd items (1, 3, 5, 7, 9): score - 1
  // Even items (2, 4, 6, 8, 10): 5 - score
  // Sum * 2.5
  const calculateSusScore = () => {
    let oddSum = 0;
    let evenSum = 0;
    for (let i = 1; i <= 10; i++) {
      const val = susAnswers[i] || 3;
      if (i % 2 === 1) {
        oddSum += (val - 1);
      } else {
        evenSum += (5 - val);
      }
    }
    return (oddSum + evenSum) * 2.5;
  };

  const susScore = calculateSusScore();
  const getSusGrade = (score: number) => {
    if (score >= 85) return { grade: 'A+', adjective: 'Exceptional (Top 5%)' };
    if (score >= 80) return { grade: 'A', adjective: 'Excellent Usability' };
    if (score >= 70) return { grade: 'B', adjective: 'Good / Acceptable' };
    if (score >= 60) return { grade: 'C', adjective: 'Marginal' };
    return { grade: 'F', adjective: 'Poor / Severe Friction' };
  };

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const accuracyPercent = totalTaps > 0 ? Math.round(((totalTaps - misclicks) / totalTaps) * 100) : 100;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-6">
      {/* Top Header & Session Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <span>Usability Testing Lab</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Conduct task-driven participant testing, record time-on-task, mis-clicks, and measure SUS usability score.
          </p>
        </div>

        {/* Heatmap & Survey Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleHeatmap(!showHeatmap)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 border transition-colors cursor-pointer ${
              showHeatmap
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40'
                : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{showHeatmap ? 'Hide Tap Heatmap' : 'Show Tap Heatmap'}</span>
          </button>

          <button
            onClick={() => setShowSusSurvey(!showSusSurvey)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 border transition-colors cursor-pointer ${
              showSusSurvey
                ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/40'
                : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>SUS Usability Score ({susScore})</span>
          </button>
        </div>
      </div>

      {/* Real-time Session Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl space-y-1">
          <div className="text-[11px] font-mono text-neutral-400">ACTIVE TASK TIMER</div>
          <div className="text-xl font-bold font-mono text-white tabular-nums flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>{String(Math.floor(timerSeconds / 60)).padStart(2, '0')}:{String(timerSeconds % 60).padStart(2, '0')}</span>
          </div>
          <div className="text-[10px] text-neutral-500">Live test duration</div>
        </div>

        <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl space-y-1">
          <div className="text-[11px] font-mono text-neutral-400">COMPLETION RATE</div>
          <div className="text-xl font-bold font-mono text-white tabular-nums">
            {completedCount} / {tasks.length} <span className="text-xs font-normal text-emerald-400">({Math.round((completedCount / tasks.length) * 100)}%)</span>
          </div>
          <div className="text-[10px] text-neutral-500">Structured tasks passed</div>
        </div>

        <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl space-y-1">
          <div className="text-[11px] font-mono text-neutral-400">CLICK ACCURACY</div>
          <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
            {accuracyPercent}%
          </div>
          <div className="text-[10px] text-neutral-500">{misclicks} mis-clicks outside hotspots</div>
        </div>

        <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl space-y-1">
          <div className="text-[11px] font-mono text-neutral-400">SUS INDEX RATING</div>
          <div className="text-xl font-bold font-mono text-indigo-400 tabular-nums">
            {susScore} / 100
          </div>
          <div className="text-[10px] text-neutral-500">{getSusGrade(susScore).grade} · {getSusGrade(susScore).adjective}</div>
        </div>
      </div>

      {/* Active Task Card */}
      <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/20">
              TASK 0{activeTask.taskNumber}
            </span>
            <h4 className="text-sm font-semibold text-white">{activeTask.title}</h4>
          </div>
          <div className="flex items-center gap-2">
            {!isRunning ? (
              <button
                onClick={() => handleStartTask(activeTask.id)}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Test Run</span>
              </button>
            ) : (
              <button
                onClick={handlePauseTask}
                className="px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Run</span>
              </button>
            )}

            <button
              onClick={handleFinishTask}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mark Done</span>
            </button>

            <button
              onClick={() => onResetTask(activeTask.id)}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Reset task stats"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="text-xs text-neutral-300 bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
          <span className="text-neutral-400 font-medium">Participant Prompt: </span>
          {activeTask.instruction}
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
          <div>Criteria: <span className="text-neutral-300">{activeTask.successCriteria}</span></div>
          <div>Target Stage: <span className="text-emerald-400 font-mono capitalize">{activeTask.targetScreenId}</span></div>
        </div>
      </div>

      {/* Task List Selector */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          Internship Usability Protocol Tasks
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onSelectTask(task.id)}
              className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                activeTaskId === task.id
                  ? 'bg-neutral-800/80 border-emerald-500 ring-1 ring-emerald-500/40'
                  : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-neutral-400 text-[10px]">TASK 0{task.taskNumber}</span>
                <span className={`text-[10px] font-mono capitalize ${
                  task.status === 'completed' ? 'text-emerald-400' : 'text-neutral-500'
                }`}>
                  {task.status === 'completed' ? '✓ Passed' : 'Pending'}
                </span>
              </div>
              <div className="font-medium text-white line-clamp-1">{task.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SUS Survey Questionnaire Drawer */}
      {showSusSurvey && (
        <div className="p-5 bg-neutral-950 border border-indigo-500/30 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div>
              <h4 className="text-sm font-semibold text-white">System Usability Scale (SUS) Standard</h4>
              <p className="text-xs text-neutral-400">Score: {susScore} / 100 ({getSusGrade(susScore).grade} - {getSusGrade(susScore).adjective})</p>
            </div>
            <button
              onClick={() => setShowSusSurvey(false)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Close Survey
            </button>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
            {SUS_QUESTIONS.map((q) => (
              <div key={q.id} className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-neutral-300 flex-1">{q.id}. {q.text}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] text-neutral-500 mr-1">Strongly Disagree</span>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      onClick={() => setSusAnswers({ ...susAnswers, [q.id]: val })}
                      className={`w-6 h-6 rounded text-xs font-mono transition-colors cursor-pointer ${
                        susAnswers[q.id] === val
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'bg-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                  <span className="text-[10px] text-neutral-500 ml-1">Strongly Agree</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
