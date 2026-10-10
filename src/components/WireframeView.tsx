import React from 'react';
import { ScreenId } from '../types';
import { ArrowLeft, Heart, Search, SlidersHorizontal, MapPin, Calendar, Users, Check, Share2, Compass, Bookmark, User } from 'lucide-react';

interface WireframeViewProps {
  screenId: ScreenId;
  onNavigate: (target: ScreenId) => void;
  showAnnotations?: boolean;
}

export const WireframeView: React.FC<WireframeViewProps> = ({
  screenId,
  onNavigate,
  showAnnotations = true
}) => {
  return (
    <div className="relative w-full h-full bg-neutral-100 text-neutral-800 font-sans select-none overflow-y-auto">
      {/* Wireframe Grid Blueprint Watermark Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Screen Spec Tag */}
      {showAnnotations && (
        <div className="sticky top-2 z-20 mx-4 my-2 px-3 py-1.5 bg-neutral-800 text-neutral-200 text-xs font-mono rounded flex items-center justify-between shadow-sm">
          <span>LO-FI WIREFRAME · ARCHITECTURE VIEW</span>
          <span className="text-neutral-400">393 × 852 PT</span>
        </div>
      )}

      {/* Screen 1: Welcome Wireframe */}
      {screenId === 'welcome' && (
        <div className="p-6 flex flex-col justify-between min-h-[780px]">
          <div>
            {/* Wordmark placeholder */}
            <div className="flex items-center justify-between pb-6 border-b border-neutral-300">
              <div className="h-6 w-28 bg-neutral-300 rounded flex items-center justify-center text-[10px] font-mono text-neutral-600">
                [BRAND_LOGO]
              </div>
              <div className="h-5 w-16 border border-dashed border-neutral-400 rounded text-[9px] font-mono flex items-center justify-center text-neutral-500">
                SKIP LINK
              </div>
            </div>

            {/* Wireframe Hero Box with Diagonal Cross */}
            <div className="mt-8 relative w-full h-64 bg-neutral-200 border-2 border-dashed border-neutral-400 rounded-lg flex flex-col items-center justify-center overflow-hidden">
              <svg className="absolute inset-0 w-full h-full text-neutral-300" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
              </svg>
              <div className="relative z-10 px-3 py-1.5 bg-white/90 border border-neutral-300 rounded text-xs font-mono text-neutral-700">
                HERO_VISUAL (4:3 RATIO)
              </div>
            </div>

            {/* Typography hierarchy wireframe */}
            <div className="mt-8 space-y-3">
              <div className="h-7 w-3/4 bg-neutral-800 rounded text-white text-xs font-mono flex items-center px-2">
                HEADING 1: Value Proposition
              </div>
              <div className="space-y-1.5 pt-2">
                <div className="h-3 w-full bg-neutral-300 rounded" />
                <div className="h-3 w-5/6 bg-neutral-300 rounded" />
                <div className="h-3 w-2/3 bg-neutral-300 rounded" />
              </div>
            </div>

            {showAnnotations && (
              <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-900 font-mono">
                ANNOTATION: Keep onboarding to 1 primary interaction to prevent cognitive friction before feed access.
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-neutral-300">
            <button
              onClick={() => onNavigate('explore')}
              className="w-full py-3.5 bg-neutral-900 text-white rounded-lg font-mono text-xs flex items-center justify-center gap-2 hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>[ACTION_CTA] Explore Sanctuaries</span>
              <span>→</span>
            </button>
            <div className="mt-2 text-center text-[10px] font-mono text-neutral-500">
              Hotspot target: min 48px thumb safe zone
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Explore Wireframe */}
      {screenId === 'explore' && (
        <div className="p-4 pb-20 space-y-4">
          {/* Header search wireframe */}
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-300">
            <div className="flex-1 h-10 border border-neutral-400 bg-white rounded-lg px-3 flex items-center gap-2 text-neutral-500 font-mono text-xs">
              <Search className="w-4 h-4" />
              <span>SEARCH_BAR_PLACEHOLDER</span>
            </div>
            <div className="w-10 h-10 border border-neutral-400 bg-white rounded-lg flex items-center justify-center text-neutral-700">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
          </div>

          {/* Filter segment wireframe */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {['All', 'Coastal', 'Forest', 'Alpine', 'Solar'].map((item, idx) => (
              <div
                key={item}
                className={`px-3 py-1.5 text-xs font-mono rounded border ${
                  idx === 0 
                    ? 'bg-neutral-800 text-white border-neutral-800' 
                    : 'bg-white text-neutral-600 border-neutral-300'
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Property Card 1 (Clickable target) */}
          <div
            onClick={() => onNavigate('detail')}
            className="border-2 border-neutral-400 bg-white rounded-lg overflow-hidden cursor-pointer hover:border-neutral-800 transition-colors"
          >
            <div className="relative h-44 bg-neutral-200 border-b border-neutral-300 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full text-neutral-300" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
              </svg>
              <div className="relative z-10 px-2 py-1 bg-white/90 border border-neutral-300 text-[10px] font-mono">
                IMAGE: Nordic Cliff Sanctuary
              </div>
              <div className="absolute top-2 right-2 w-8 h-8 bg-white/90 border border-neutral-300 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-neutral-500" />
              </div>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex justify-between items-start">
                <div className="h-4 w-40 bg-neutral-800 rounded" />
                <div className="h-4 w-12 bg-neutral-300 rounded" />
              </div>
              <div className="h-3 w-28 bg-neutral-300 rounded" />
              <div className="flex items-center justify-between pt-1 border-t border-neutral-200 text-xs font-mono">
                <span className="font-semibold text-neutral-900">$320 / night</span>
                <span className="text-[10px] text-neutral-500">[CLICKABLE CARD]</span>
              </div>
            </div>
          </div>

          {/* Property Card 2 */}
          <div className="border border-neutral-300 bg-white rounded-lg overflow-hidden opacity-75">
            <div className="relative h-40 bg-neutral-200 border-b border-neutral-300 flex items-center justify-center">
              <span className="text-[10px] font-mono text-neutral-500">IMAGE: Botanical Glasshouse Studio</span>
            </div>
            <div className="p-3 space-y-2">
              <div className="h-4 w-36 bg-neutral-700 rounded" />
              <div className="h-3 w-24 bg-neutral-300 rounded" />
              <div className="text-xs font-mono text-neutral-900">$240 / night</div>
            </div>
          </div>

          {/* Wireframe Bottom Tab Dock */}
          <div className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-neutral-300 flex items-center justify-around font-mono text-[10px] text-neutral-600">
            <div className="flex flex-col items-center text-neutral-900 font-bold">
              <Compass className="w-4 h-4" />
              <span>EXPLORE</span>
            </div>
            <div className="flex flex-col items-center">
              <Bookmark className="w-4 h-4" />
              <span>SAVED</span>
            </div>
            <div className="flex flex-col items-center">
              <User className="w-4 h-4" />
              <span>PROFILE</span>
            </div>
          </div>
        </div>
      )}

      {/* Screen 3: Detail Wireframe */}
      {screenId === 'detail' && (
        <div className="p-4 pb-24 space-y-4">
          {/* Top navigation actions */}
          <div className="flex items-center justify-between pb-2 border-b border-neutral-300">
            <button
              onClick={() => onNavigate('explore')}
              className="p-1.5 border border-neutral-400 bg-white rounded-md text-neutral-800 hover:bg-neutral-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs">[NAV_BAR: DETAIL]</span>
            <div className="p-1.5 border border-neutral-400 bg-white rounded-md">
              <Share2 className="w-4 h-4 text-neutral-600" />
            </div>
          </div>

          {/* Hero Wireframe image */}
          <div className="relative h-56 bg-neutral-200 border-2 border-dashed border-neutral-400 rounded-lg flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full text-neutral-300" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
            </svg>
            <div className="relative z-10 px-3 py-1 bg-white border border-neutral-300 rounded font-mono text-xs">
              HERO CAROUSEL: 5 PHOTOS
            </div>
          </div>

          {/* Property metadata */}
          <div className="space-y-2">
            <div className="h-6 w-3/4 bg-neutral-800 rounded" />
            <div className="h-4 w-1/2 bg-neutral-400 rounded" />
            <div className="h-4 w-1/3 bg-neutral-300 rounded" />
          </div>

          {/* Amenities grid wireframe */}
          <div className="pt-2 border-t border-neutral-300">
            <div className="text-xs font-mono font-bold mb-2">[AMENITIES MATRIX]</div>
            <div className="grid grid-cols-2 gap-2">
              {['Off-Grid Solar', 'Fjord View Sauna', 'Starlink 200Mbps', 'Wood Stove Heating'].map((am) => (
                <div key={am} className="p-2 border border-neutral-300 bg-white rounded text-[11px] font-mono text-neutral-700 flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {showAnnotations && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-900 font-mono">
              UX ITERATION NOTE: Previous version placed "Reserve Dates" below long description. Moved to persistent bottom dock for zero-friction conversion.
            </div>
          )}

          {/* Sticky Bottom Reserve Dock */}
          <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-neutral-300 flex items-center justify-between shadow-lg">
            <div>
              <div className="text-xs font-mono font-bold text-neutral-900">$320 / night</div>
              <div className="text-[10px] font-mono text-neutral-500">Oct 14 · 3 nights</div>
            </div>
            <button
              onClick={() => onNavigate('booking')}
              className="px-5 py-2.5 bg-neutral-900 text-white font-mono text-xs rounded-lg hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer"
            >
              [CTA] Reserve Dates →
            </button>
          </div>
        </div>
      )}

      {/* Screen 4: Booking Drawer Wireframe */}
      {screenId === 'booking' && (
        <div className="p-4 pb-20 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-300">
            <button
              onClick={() => onNavigate('detail')}
              className="text-xs font-mono text-neutral-600 underline cursor-pointer"
            >
              [Cancel / Back]
            </button>
            <span className="font-mono text-xs font-bold">[MODAL: RESERVATION]</span>
            <div className="w-6" />
          </div>

          {/* Date Picker Wireframe Box */}
          <div className="p-3 border border-neutral-400 bg-white rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-700">
              <Calendar className="w-4 h-4" />
              <span>DATES: Oct 14 – Oct 17 (3 Nights)</span>
            </div>
            <div className="h-10 bg-neutral-100 border border-dashed border-neutral-300 rounded flex items-center justify-center font-mono text-[10px] text-neutral-500">
              [CALENDAR_DATE_SELECTOR_COMPONENT]
            </div>
          </div>

          {/* Guest Stepper Wireframe */}
          <div className="p-3 border border-neutral-400 bg-white rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-700">
              <Users className="w-4 h-4" />
              <span>GUESTS: 2 Adults</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <div className="w-7 h-7 border border-neutral-400 rounded flex items-center justify-center font-bold">-</div>
              <span>2</span>
              <div className="w-7 h-7 border border-neutral-400 rounded flex items-center justify-center font-bold">+</div>
            </div>
          </div>

          {/* Price Breakdown wireframe table */}
          <div className="p-3 border border-neutral-400 bg-white rounded-lg space-y-2 font-mono text-xs">
            <div className="font-bold border-b border-neutral-200 pb-1">[TRANSPARENT BREAKDOWN]</div>
            <div className="flex justify-between text-neutral-600">
              <span>$320 × 3 nights</span>
              <span>$960</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Eco-cleaning service</span>
              <span>$65</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>100% Carbon offset (Certified)</span>
              <span>$12</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-neutral-300 text-neutral-900">
              <span>TOTAL DUE</span>
              <span>$1,037</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('confirmation')}
            className="w-full py-3.5 bg-neutral-900 text-white rounded-lg font-mono text-xs flex items-center justify-center gap-2 hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>[CONFIRM_AND_PAY_ACTION] $1,037</span>
          </button>
        </div>
      )}

      {/* Screen 5: Confirmation Wireframe */}
      {screenId === 'confirmation' && (
        <div className="p-6 flex flex-col justify-between min-h-[780px]">
          <div className="text-center space-y-4 pt-4">
            <div className="w-16 h-16 mx-auto bg-neutral-200 border-2 border-neutral-800 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-neutral-800" />
            </div>
            <div className="font-mono text-base font-bold">[BOOKING CONFIRMED]</div>
            <div className="text-xs font-mono text-neutral-600">Reference: #AH-8942 · Oct 14–17</div>

            {/* QR Pass Wireframe Box */}
            <div className="my-6 mx-auto w-48 h-48 border-2 border-dashed border-neutral-500 bg-white rounded-lg flex flex-col items-center justify-center p-4">
              <div className="w-32 h-32 bg-neutral-800 flex items-center justify-center text-white text-[10px] font-mono">
                [SCANNABLE_QR_CODE]
              </div>
              <div className="mt-2 text-[9px] font-mono text-neutral-500">DIGITAL ENTRY PASS</div>
            </div>

            <div className="p-3 bg-neutral-200 rounded font-mono text-xs text-neutral-700 text-left space-y-1">
              <div>PROPERTY: Nordic Cliff Sanctuary</div>
              <div>COORDINATES: 68.214° N, 14.538° E</div>
              <div>PIN CODE: 4821 (Unlocks on arrival)</div>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-300">
            <button
              onClick={() => onNavigate('explore')}
              className="w-full py-3.5 bg-neutral-900 text-white rounded-lg font-mono text-xs hover:bg-neutral-800 cursor-pointer"
            >
              Return to Sanctuary Feed →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
