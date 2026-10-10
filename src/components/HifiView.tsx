import React, { useState } from 'react';
import { ScreenId } from '../types';
import { IMAGE_ASSETS } from '../data/initialData';
import { 
  ArrowLeft, Heart, Search, SlidersHorizontal, MapPin, 
  Calendar, Users, Check, Share2, Compass, Bookmark, 
  User, Sparkles, ShieldCheck, Sun, Wind, Wifi, Flame,
  QrCode, ChevronRight, X
} from 'lucide-react';

interface HifiViewProps {
  screenId: ScreenId;
  onNavigate: (target: ScreenId) => void;
  onHotspotClick?: (hotspotId: string) => void;
}

export const HifiView: React.FC<HifiViewProps> = ({
  screenId,
  onNavigate,
  onHotspotClick
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'coastal' | 'forest' | 'alpine'>('all');
  const [isFavorited, setIsFavorited] = useState(false);
  const [guestsCount, setGuestsCount] = useState(2);
  const [activeTab, setActiveTab] = useState<'explore' | 'saved' | 'profile'>('explore');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle click on hotspot
  const handleAction = (target: ScreenId, hotspotId?: string) => {
    if (hotspotId && onHotspotClick) {
      onHotspotClick(hotspotId);
    }
    onNavigate(target);
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    if (onHotspotClick) onHotspotClick('heart-toggle');
  };

  return (
    <div className="relative w-full h-full bg-neutral-950 text-neutral-100 font-sans select-none overflow-y-auto">
      {/* SCREEN 1: WELCOME / ONBOARDING */}
      {screenId === 'welcome' && (
        <div className="relative flex flex-col justify-between min-h-[780px] p-6 overflow-hidden">
          {/* Subtle Ambient Background Scrim */}
          <div className="absolute inset-0 z-0">
            <img
              src={IMAGE_ASSETS.natureCafe}
              alt="Sustainable sanctuary greenhouse"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-35 scale-105 filter blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />
          </div>

          {/* Top Brand Bar */}
          <div className="relative z-10 flex items-center justify-between pt-2">
            <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Aura Haven</span>
            </div>
            <button 
              onClick={() => handleAction('explore', 'skip-button')}
              className="text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Skip
            </button>
          </div>

          {/* Middle Value Proposition */}
          <div className="relative z-10 space-y-4 my-auto py-12">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 tracking-wide uppercase">
              <span>Verified Off-Grid Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Quiet sanctuaries built in harmony with raw nature.
            </h1>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-sm">
              Discover architecturally secluded cabins, solar-powered coastal lookouts, and restored alpine shelters with guaranteed zero-carbon footprints.
            </p>
          </div>

          {/* Bottom Action Area */}
          <div className="relative z-10 space-y-3 pt-6 border-t border-neutral-800/80">
            <button
              onClick={() => handleAction('explore', 'explore-sanctuaries-cta')}
              data-hotspot="explore-sanctuaries-cta"
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Explore Sanctuaries</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified 100% Carbon Neutral Booking</span>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 2: EXPLORE FEED */}
      {screenId === 'explore' && (
        <div className="relative min-h-full pb-20 p-4 space-y-5">
          {/* Top Search & Filter Bar */}
          <div className="sticky top-0 z-20 pt-2 pb-3 bg-neutral-950/90 backdrop-blur-md space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 flex items-center gap-2.5 text-neutral-400 focus-within:border-emerald-500 transition-colors">
                <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search coastal cliffs, fjords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-neutral-100 placeholder-neutral-500 outline-none w-full"
                />
              </div>
              <button 
                onClick={() => onHotspotClick?.('filter-button')}
                className="w-11 h-11 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl flex items-center justify-center text-neutral-300 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: 'all', label: 'All Sanctuaries' },
                { id: 'coastal', label: 'Coastal Cliffs' },
                { id: 'forest', label: 'Moss Forest' },
                { id: 'alpine', label: 'Alpine Shelters' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id as any);
                    onHotspotClick?.(`category-${cat.id}`);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-neutral-100 text-neutral-900 font-semibold'
                      : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Card 1: Nordic Coastal Retreat (Primary Target) */}
          <div
            onClick={() => handleAction('detail', 'nordic-cliff-card')}
            data-hotspot="nordic-cliff-card"
            className="group relative bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 active:scale-[0.99]"
          >
            {/* Visual Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-800">
              <img
                src={IMAGE_ASSETS.coastalCabin}
                alt="Nordic Cliff Sanctuary cabin overlooking misty cliffs"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
              
              {/* Floating Favorite Micro-Interaction */}
              <button
                onClick={handleFavoriteToggle}
                data-hotspot="heart-toggle"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-neutral-900/70 backdrop-blur-md flex items-center justify-center text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                aria-label="Save to favorites"
              >
                <Heart 
                  className={`w-4 h-4 transition-transform duration-150 ${
                    isFavorited ? 'fill-rose-500 text-rose-500 scale-110' : 'text-white'
                  }`} 
                />
              </button>

              <div className="absolute bottom-3 left-3 text-xs text-neutral-200 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lofoten Arch., Norway</span>
              </div>
            </div>

            {/* Content & Metadata */}
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  Nordic Cliff Sanctuary
                </h3>
                <div className="text-xs font-mono font-medium text-emerald-400">
                  ★ 4.98 <span className="text-neutral-500 font-normal">(64)</span>
                </div>
              </div>

              {/* Zero-Pill Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span>Solar Microgrid</span>
                <span aria-hidden="true">·</span>
                <span>Off-Grid Sauna</span>
                <span aria-hidden="true">·</span>
                <span>Zero Sound Pollution</span>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-neutral-800/80">
                <div className="text-sm font-semibold text-neutral-100">
                  $320 <span className="text-xs font-normal text-neutral-400">/ night</span>
                </div>
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  View Sanctuary →
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Botanical Glasshouse Studio */}
          <div 
            onClick={() => onHotspotClick?.('botanical-card')}
            className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden cursor-pointer opacity-90 hover:opacity-100 transition-all"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-800">
              <img
                src={IMAGE_ASSETS.natureCafe}
                alt="Botanical Glasshouse Studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs text-neutral-200 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Småland Biosphere, Sweden</span>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-white">Botanical Glasshouse Studio</h3>
                <div className="text-xs font-mono font-medium text-emerald-400">★ 4.92 (41)</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span>Indoor Greenhouse</span>
                <span aria-hidden="true">·</span>
                <span>Hydroponic Farm</span>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-neutral-800/80">
                <div className="text-sm font-semibold text-neutral-100">
                  $240 <span className="text-xs font-normal text-neutral-400">/ night</span>
                </div>
                <span className="text-xs text-neutral-500">Available from Nov 2</span>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Navigation Bar */}
          <div className="fixed bottom-0 left-0 right-0 h-16 bg-neutral-950/95 border-t border-neutral-800/90 backdrop-blur-lg flex items-center justify-around z-30">
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex flex-col items-center gap-1 text-xs cursor-pointer ${
                activeTab === 'explore' ? 'text-emerald-400 font-semibold' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Explore</span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex flex-col items-center gap-1 text-xs cursor-pointer ${
                activeTab === 'saved' ? 'text-emerald-400 font-semibold' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved (1)</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 text-xs cursor-pointer ${
                activeTab === 'profile' ? 'text-emerald-400 font-semibold' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 3: DETAIL VIEW */}
      {screenId === 'detail' && (
        <div className="relative min-h-full pb-28">
          {/* Floating Top Nav */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-neutral-950/80 backdrop-blur-md">
            <button
              onClick={() => handleAction('explore', 'detail-back-button')}
              data-hotspot="detail-back-button"
              className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-200 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Sanctuary Detail</span>
            <button
              onClick={() => onHotspotClick?.('share-button')}
              className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-200 hover:text-white transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Photography Carousel View */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
            <img
              src={IMAGE_ASSETS.coastalCabin}
              alt="Nordic Cliff Sanctuary cabin architecture"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-neutral-950/70 backdrop-blur-md text-[11px] font-mono text-neutral-300">
              1 / 6 Photos
            </div>
          </div>

          {/* Detailed Content */}
          <div className="p-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Certified B-Corp Stay · 100% Carbon Neutral</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Nordic Cliff Sanctuary
              </h1>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span>Lofoten archipelago, Norway</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-neutral-200">★ 4.98 (64 reviews)</span>
              </div>
            </div>

            {/* Architecture Overview */}
            <div className="space-y-3 pt-3 border-t border-neutral-800/80">
              <h2 className="text-sm font-semibold text-neutral-200">The Space</h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Perched 120 meters above the North Sea on a secluded coastal granite bluff, this timber shelter was engineered for absolute silence, aurora watching, and mindful focus. Completely off-grid with heated geothermal floors.
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-3 pt-3 border-t border-neutral-800/80">
              <h2 className="text-sm font-semibold text-neutral-200">Eco-Amenities</h2>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { icon: Sun, title: 'Solar Microgrid', sub: 'Zero fossil fuels' },
                  { icon: Wind, title: 'Fjord Sauna', sub: 'Wood-fired cedar' },
                  { icon: Wifi, title: 'Starlink Wi-Fi', sub: '200 Mbps low latency' },
                  { icon: Flame, title: 'Cast-Iron Hearth', sub: 'Seasoned birch wood' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
                    <item.icon className="w-4 h-4 text-emerald-400" />
                    <div className="text-xs font-semibold text-neutral-100">{item.title}</div>
                    <div className="text-[10px] text-neutral-400">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Review Snippet */}
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2.5">
                <img
                  src={IMAGE_ASSETS.testerAvatar}
                  alt="Verified guest reviewer"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover border border-neutral-700"
                />
                <div>
                  <div className="text-xs font-medium text-white">Linnea Lindström</div>
                  <div className="text-[10px] text-neutral-400">Stayed September 2026 · Verified Guest</div>
                </div>
              </div>
              <p className="text-xs text-neutral-300 italic">
                "The silence is unreal. Waking up to ocean fog through the panoramic glass was life-changing."
              </p>
            </div>
          </div>

          {/* Sticky Bottom Reserve Dock */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-neutral-950/95 border-t border-neutral-800/90 backdrop-blur-xl flex items-center justify-between z-30 shadow-2xl">
            <div>
              <div className="text-base font-bold text-white font-mono">
                $320 <span className="text-xs font-normal text-neutral-400">/ night</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium">
                Oct 14 – 17 · 3 Nights
              </div>
            </div>
            <button
              onClick={() => handleAction('booking', 'reserve-dates-cta')}
              data-hotspot="reserve-dates-cta"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-xs rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            >
              Reserve Dates →
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 4: INTERACTIVE BOOKING DRAWER */}
      {screenId === 'booking' && (
        <div className="relative min-h-full flex flex-col justify-between p-5 pb-8 space-y-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <button
              onClick={() => handleAction('detail', 'booking-cancel-button')}
              data-hotspot="booking-cancel-button"
              className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Confirm Reservation
            </div>
            <div className="w-8" />
          </div>

          <div className="space-y-4">
            {/* Property Summary Pill */}
            <div className="flex items-center gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-xl">
              <img
                src={IMAGE_ASSETS.coastalCabin}
                alt="Nordic Cliff Sanctuary"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h4 className="text-xs font-semibold text-white">Nordic Cliff Sanctuary</h4>
                <p className="text-[11px] text-neutral-400">Lofoten, Norway · 3 Nights</p>
              </div>
            </div>

            {/* Date Selection Box */}
            <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  Selected Dates
                </span>
                <span className="text-white font-medium">Oct 14 – Oct 17</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono text-xs">
                <div className="p-2 bg-neutral-800/80 rounded-lg text-emerald-400 font-semibold border border-emerald-500/30">
                  Oct 14 (Check-in)
                </div>
                <div className="p-2 bg-neutral-800/80 rounded-lg text-emerald-400 font-semibold border border-emerald-500/30">
                  Oct 15 - 16
                </div>
                <div className="p-2 bg-neutral-800/80 rounded-lg text-emerald-400 font-semibold border border-emerald-500/30">
                  Oct 17 (Check-out)
                </div>
              </div>
            </div>

            {/* Guest Stepper */}
            <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-xs font-semibold text-white">Guests</div>
                  <div className="text-[10px] text-neutral-400">Maximum capacity: 4 guests</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                  className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="font-mono text-sm font-semibold text-white w-4 text-center">
                  {guestsCount}
                </span>
                <button
                  onClick={() => setGuestsCount(Math.min(4, guestsCount + 1))}
                  className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Transparent Cost Breakdown */}
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2 text-xs">
              <div className="font-semibold text-neutral-300 pb-1 border-b border-neutral-800">
                Transparent Pricing
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>$320 × 3 nights</span>
                <span className="font-mono text-neutral-200 tabular-nums">$960.00</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Eco-cleaning service</span>
                <span className="font-mono text-neutral-200 tabular-nums">$65.00</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Verified 100% Carbon Offset</span>
                <span className="font-mono tabular-nums">$12.00</span>
              </div>
              <div className="pt-2 border-t border-neutral-800 flex justify-between font-bold text-white text-sm">
                <span>Total (USD)</span>
                <span className="font-mono tabular-nums text-emerald-400">$1,037.00</span>
              </div>
            </div>
          </div>

          {/* Confirm Action Button */}
          <div className="pt-3">
            <button
              onClick={() => handleAction('confirmation', 'confirm-pay-cta')}
              data-hotspot="confirm-pay-cta"
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Reserve · $1,037</span>
            </button>
            <p className="text-center text-[10px] text-neutral-400 mt-2">
              Free cancellation up to 48 hours before check-in.
            </p>
          </div>
        </div>
      )}

      {/* SCREEN 5: CONFIRMATION / DIGITAL PASS */}
      {screenId === 'confirmation' && (
        <div className="relative flex flex-col justify-between min-h-[780px] p-6 text-center">
          <div className="space-y-4 pt-4">
            {/* Animated Success Badge */}
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Sanctuary Reserved!
              </h2>
              <p className="text-xs text-neutral-400">
                Confirmation sent to your email · Booking ref <span className="font-mono text-emerald-400">#AH-8942</span>
              </p>
            </div>

            {/* Digital Entry Pass Card with Scannable QR */}
            <div className="my-6 mx-auto max-w-xs bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="text-left">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">GUEST PASS</div>
                  <div className="text-xs font-semibold text-white">Nordic Cliff Sanctuary</div>
                </div>
                <div className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                  OFF-GRID KEY
                </div>
              </div>

              {/* High Contrast QR Code Simulation */}
              <div className="w-36 h-36 mx-auto bg-white p-2.5 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-full h-full text-neutral-950" viewBox="0 0 24 24" fill="currentColor">
                  {/* Stylized QR Code Matrix */}
                  <rect x="2" y="2" width="6" height="6" rx="1" />
                  <rect x="3.5" y="3.5" width="3" height="3" fill="white" />
                  <rect x="16" y="2" width="6" height="6" rx="1" />
                  <rect x="17.5" y="3.5" width="3" height="3" fill="white" />
                  <rect x="2" y="16" width="6" height="6" rx="1" />
                  <rect x="3.5" y="17.5" width="3" height="3" fill="white" />
                  <rect x="10" y="4" width="2" height="4" />
                  <rect x="10" y="10" width="4" height="2" />
                  <rect x="4" y="10" width="4" height="2" />
                  <rect x="10" y="16" width="2" height="4" />
                  <rect x="16" y="10" width="4" height="4" />
                  <rect x="18" y="18" width="4" height="4" />
                </svg>
              </div>

              <div className="space-y-1 text-xs text-neutral-300 font-mono text-center">
                <div>Arrival Code: <span className="font-bold text-white tracking-widest">4821</span></div>
                <div className="text-[10px] text-neutral-400">Valid from 3:00 PM, Oct 14</div>
              </div>
            </div>

            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-left text-xs space-y-1.5">
              <div className="flex justify-between text-neutral-400">
                <span>Check-in:</span>
                <span className="text-white font-medium">Monday, Oct 14 (3:00 PM)</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Check-out:</span>
                <span className="text-white font-medium">Thursday, Oct 17 (11:00 AM)</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Carbon Offset:</span>
                <span className="text-emerald-400 font-mono">0.42 tCO2e (Verified Gold Standard)</span>
              </div>
            </div>
          </div>

          {/* Return Home Action */}
          <div className="pt-4 border-t border-neutral-800">
            <button
              onClick={() => handleAction('explore', 'return-explore-cta')}
              data-hotspot="return-explore-cta"
              className="w-full py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              Return to Sanctuary Feed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
