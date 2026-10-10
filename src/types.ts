export type DeviceType = 'iphone-16-pro' | 'pixel-9' | 'frameless';

export type ViewMode = 'hifi' | 'wireframe' | 'split';

export type TransitionType = 
  | 'smart-animate' 
  | 'slide-left' 
  | 'slide-right' 
  | 'slide-up' 
  | 'dissolve' 
  | 'instant' 
  | 'spring';

export type ScreenId = 
  | 'welcome' 
  | 'explore' 
  | 'detail' 
  | 'booking' 
  | 'confirmation';

export interface PrototypeScreen {
  id: ScreenId;
  name: string;
  wireframeTitle: string;
  category: 'onboarding' | 'discovery' | 'detail' | 'transaction' | 'feedback';
  description: string;
  wireframeNotes: string[];
  dimensions: { width: number; height: number };
}

export interface NavigationConnection {
  id: string;
  fromScreen: ScreenId;
  toScreen: ScreenId;
  trigger: 'on-click' | 'on-drag' | 'after-delay' | 'on-submit';
  transition: TransitionType;
  durationMs: number;
  label: string;
}

export interface UserTestTask {
  id: string;
  taskNumber: number;
  title: string;
  instruction: string;
  targetScreenId: ScreenId;
  expectedHotspotId?: string;
  successCriteria: string;
  status: 'pending' | 'in-progress' | 'completed' | 'abandoned';
  timeSpentSec: number;
  misclicks: number;
  completedAt?: string;
}

export interface CommentPin {
  id: string;
  screenId: ScreenId;
  xPercent: number; // 0-100% of screen
  yPercent: number;
  authorName: string;
  authorRole: 'UX Lead' | 'Design Mentor' | 'Product Manager' | 'User Tester' | 'Intern';
  authorAvatar?: string;
  content: string;
  severity: 'blocker' | 'major-usability' | 'minor-ui' | 'suggestion';
  timestamp: string;
  resolved: boolean;
  resolutionNote?: string;
}

export interface DesignIteration {
  id: string;
  screenId: ScreenId;
  title: string;
  beforeProblem: string;
  testingInsight: string;
  afterSolution: string;
  metricsImpact: string;
  status: 'implemented' | 'validating';
}

export interface TapCoordinate {
  id: string;
  screenId: ScreenId;
  x: number;
  y: number;
  isHotspot: boolean;
  timestamp: number;
}
