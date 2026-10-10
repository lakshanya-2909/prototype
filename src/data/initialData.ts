import { PrototypeScreen, NavigationConnection, UserTestTask, CommentPin, DesignIteration } from '../types';

export const SCREEN_SPECS: PrototypeScreen[] = [
  {
    id: 'welcome',
    name: '01. Welcome & Onboarding',
    wireframeTitle: 'WF_01: Splash & Value Proposition',
    category: 'onboarding',
    description: 'First-time user onboarding screen communicating zero-carbon retreats with direct CTA to browse.',
    wireframeNotes: [
      'Visual hierarchy: Brand wordmark top, high-impact hero, concise value proposition',
      'Primary CTA "Explore Sanctuaries" fixed in lower thumb zone (48px height target)',
      'Single-tap guest sign-in bypass for frictionless testing'
    ],
    dimensions: { width: 393, height: 852 }
  },
  {
    id: 'explore',
    name: '02. Curated Sanctuaries Feed',
    wireframeTitle: 'WF_02: Discovery & Filter Matrix',
    category: 'discovery',
    description: 'Browse sanctuaries with quick category filters, rating cards, and interactive favorite toggles.',
    wireframeNotes: [
      'Sticky search & category segment bar (Coastal, Forest, Alpine, Solar)',
      'Card anatomy: 4:3 image ratio, unboxed metadata (location · price · rating)',
      'Micro-interaction: Heart icon with 120ms spring scale feedback'
    ],
    dimensions: { width: 393, height: 852 }
  },
  {
    id: 'detail',
    name: '03. Nordic Cliff Retreat Detail',
    wireframeTitle: 'WF_03: Property Deep Dive & Amenities',
    category: 'detail',
    description: 'High-fidelity property specifications, host certification, carbon offset details, and sticky booking bar.',
    wireframeNotes: [
      'Top navigational bar with back affordance and share action',
      'Hero photography carousel indicator with 3:2 aspect ratio',
      'Sticky bottom action dock ensuring Reserve CTA is never lost below scroll'
    ],
    dimensions: { width: 393, height: 852 }
  },
  {
    id: 'booking',
    name: '04. Interactive Reservation Drawer',
    wireframeTitle: 'WF_04: Date, Guest & Cost Breakdown',
    category: 'transaction',
    description: 'Modal bottom sheet with date selector, guest stepper (+/-), pricing transparency, and instant confirm.',
    wireframeNotes: [
      'Bottom sheet presentation using drag handle gesture indicator',
      'Guest increment/decrement controls with 44px touch targets',
      'Full itemized price breakdown (Nightly rate, Eco-cleaning, Carbon offset)'
    ],
    dimensions: { width: 393, height: 852 }
  },
  {
    id: 'confirmation',
    name: '05. Verified Digital Pass',
    wireframeTitle: 'WF_05: Booking Receipt & Pass QR',
    category: 'feedback',
    description: 'Confirmed booking screen with check-in QR code, offline directions, and itinerary save.',
    wireframeNotes: [
      'Confirmation animation feedback with celebratory visual anchor',
      'High-contrast digital pass QR code scannable on arrival',
      'Direct path to return home or share pass with travel companion'
    ],
    dimensions: { width: 393, height: 852 }
  }
];

export const INITIAL_CONNECTIONS: NavigationConnection[] = [
  {
    id: 'conn-1',
    fromScreen: 'welcome',
    toScreen: 'explore',
    trigger: 'on-click',
    transition: 'slide-left',
    durationMs: 300,
    label: 'Tap "Explore Sanctuaries"'
  },
  {
    id: 'conn-2',
    fromScreen: 'explore',
    toScreen: 'detail',
    trigger: 'on-click',
    transition: 'smart-animate',
    durationMs: 350,
    label: 'Tap "Nordic Cliff Sanctuary" Card'
  },
  {
    id: 'conn-3',
    fromScreen: 'detail',
    toScreen: 'booking',
    trigger: 'on-click',
    transition: 'slide-up',
    durationMs: 300,
    label: 'Tap "Reserve Dates" CTA Dock'
  },
  {
    id: 'conn-4',
    fromScreen: 'booking',
    toScreen: 'confirmation',
    trigger: 'on-submit',
    transition: 'smart-animate',
    durationMs: 400,
    label: 'Tap "Confirm & Pay"'
  },
  {
    id: 'conn-5',
    fromScreen: 'confirmation',
    toScreen: 'explore',
    trigger: 'on-click',
    transition: 'dissolve',
    durationMs: 250,
    label: 'Tap "Return to Explore"'
  },
  {
    id: 'conn-back-1',
    fromScreen: 'detail',
    toScreen: 'explore',
    trigger: 'on-click',
    transition: 'slide-right',
    durationMs: 250,
    label: 'Back navigation arrow'
  },
  {
    id: 'conn-back-2',
    fromScreen: 'booking',
    toScreen: 'detail',
    trigger: 'on-click',
    transition: 'slide-right',
    durationMs: 250,
    label: 'Dismiss Drawer / Cancel'
  }
];

export const INITIAL_TEST_TASKS: UserTestTask[] = [
  {
    id: 'task-1',
    taskNumber: 1,
    title: 'Discover Nordic Coastal Retreat',
    instruction: 'From the Welcome screen, enter the Explore feed, filter by Coastal or scroll down, and select the Nordic Cliff Sanctuary.',
    targetScreenId: 'detail',
    successCriteria: 'Successfully land on the Nordic Cliff Retreat detail view.',
    status: 'pending',
    timeSpentSec: 0,
    misclicks: 0
  },
  {
    id: 'task-2',
    taskNumber: 2,
    title: 'Configure Reservation & Nights',
    instruction: 'On the property detail page, tap "Reserve Dates", set guests to 2, and review the cost breakdown.',
    targetScreenId: 'booking',
    successCriteria: 'Open booking drawer and review guest tally.',
    status: 'pending',
    timeSpentSec: 0,
    misclicks: 0
  },
  {
    id: 'task-3',
    taskNumber: 3,
    title: 'Confirm Booking & Access QR Pass',
    instruction: 'Submit the reservation confirmation and verify that the Digital Check-in QR pass is generated.',
    targetScreenId: 'confirmation',
    successCriteria: 'Reach confirmation screen with booking reference #AH-8942.',
    status: 'pending',
    timeSpentSec: 0,
    misclicks: 0
  }
];

export const INITIAL_COMMENTS: CommentPin[] = [
  {
    id: 'c-1',
    screenId: 'welcome',
    xPercent: 50,
    yPercent: 82,
    authorName: 'Elena Rostova',
    authorRole: 'UX Lead',
    content: 'Ensure button contrast ratio meets WCAG AA (min 4.5:1). The dark charcoal CTA on warm background is excellent and well sized.',
    severity: 'suggestion',
    timestamp: 'Today at 09:15 AM',
    resolved: true,
    resolutionNote: 'Adjusted button color to high-contrast slate-900 with clear active feedback.'
  },
  {
    id: 'c-2',
    screenId: 'explore',
    xPercent: 78,
    yPercent: 36,
    authorName: 'Marcus Chen',
    authorRole: 'Product Manager',
    content: 'Testers in Round 1 missed the favorite heart because it was too small. Recommend increasing hit target to at least 44x44px.',
    severity: 'major-usability',
    timestamp: 'Yesterday at 04:30 PM',
    resolved: true,
    resolutionNote: 'Increased tap bounding box to 48x48px with optical alignment.'
  },
  {
    id: 'c-3',
    screenId: 'detail',
    xPercent: 50,
    yPercent: 93,
    authorName: 'Sarah Jenkins',
    authorRole: 'Design Mentor',
    content: 'Crucial for mobile: The Reserve CTA was previously scrolled out of view. A sticky bottom action dock is essential.',
    severity: 'blocker',
    timestamp: 'Yesterday at 02:10 PM',
    resolved: true,
    resolutionNote: 'Implemented floating sticky dock with price summary and immediate CTA action.'
  },
  {
    id: 'c-4',
    screenId: 'booking',
    xPercent: 82,
    yPercent: 48,
    authorName: 'Alex Rivera',
    authorRole: 'User Tester',
    content: 'The guest counter +/- buttons felt a bit close together on small screens. Adding more horizontal separation helps avoid mis-taps.',
    severity: 'minor-ui',
    timestamp: 'Today at 10:45 AM',
    resolved: false
  }
];

export const INITIAL_ITERATIONS: DesignIteration[] = [
  {
    id: 'iter-1',
    screenId: 'detail',
    title: 'Floating Sticky Action Dock vs. Inline Button',
    beforeProblem: 'Initial wireframe placed the "Reserve" button at the very bottom of a 1400px scrollable screen, resulting in 42% of testers failing to locate it quickly.',
    testingInsight: 'Users spent an average of 18.4 seconds searching for how to initiate booking, causing drop-offs.',
    afterSolution: 'Converted to a persistent 72px floating bottom bar with instantaneous price display ($320/night) and prominent primary CTA.',
    metricsImpact: 'Time to initiate booking dropped from 18.4s to 3.1s; 100% completion in Round 2.',
    status: 'implemented'
  },
  {
    id: 'iter-2',
    screenId: 'explore',
    title: 'Micro-Interaction Spring Physics on Heart Bookmark',
    beforeProblem: 'Static bookmark icon had zero click feedback, causing users to tap multiple times thinking the app was unresponsive.',
    testingInsight: 'Observation logs showed 2.8 average duplicate taps per card in early usability trials.',
    afterSolution: 'Engineered a 120ms spring bounce scale animation (scale 1.35x -> 1.0) with immediate filled state and haptic pulse simulation.',
    metricsImpact: 'Duplicate mis-clicks reduced to zero; tester satisfaction rating increased by 28%.',
    status: 'implemented'
  },
  {
    id: 'iter-3',
    screenId: 'booking',
    title: 'Itemized Transparent Fee Disclosure in Modal Drawer',
    beforeProblem: 'Hidden cleaning and carbon offset charges triggered checkout abandonment during usability interviews.',
    testingInsight: '3 out of 5 participants expressed surprise and frustration when taxes were added without prior itemization.',
    afterSolution: 'Included upfront breakdown inside the booking drawer showing exact nightly rate ($320 x 3), cleaning fee ($65), and verified carbon offset ($12).',
    metricsImpact: 'Perceived trustworthiness rated 4.9/5 on post-test SUS questionnaire.',
    status: 'implemented'
  }
];

export const SUS_QUESTIONS = [
  { id: 1, text: 'I think that I would like to use this system frequently.' },
  { id: 2, text: 'I found the system unnecessarily complex.' },
  { id: 3, text: 'I thought the system was easy to use.' },
  { id: 4, text: 'I think that I would need the support of a technical person to be able to use this system.' },
  { id: 5, text: 'I found the various functions in this system were well integrated.' },
  { id: 6, text: 'I thought there was too much inconsistency in this system.' },
  { id: 7, text: 'I would imagine that most people would learn to use this system very quickly.' },
  { id: 8, text: 'I found the system very cumbersome to use.' },
  { id: 9, text: 'I felt very confident using the system.' },
  { id: 10, text: 'I needed to learn a lot of things before I could get going with this system.' }
];

export const IMAGE_ASSETS = {
  natureCafe: '/src/assets/images/proto_card_nature_1791642494629.jpg',
  coastalCabin: '/src/assets/images/proto_card_coastal_1791642507788.jpg',
  testerAvatar: '/src/assets/images/proto_avatar_tester_1791642518543.jpg'
};
