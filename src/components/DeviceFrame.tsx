import React, { useState } from 'react';
import { DeviceType, ViewMode, ScreenId, CommentPin, TapCoordinate } from '../types';
import { WireframeView } from './WireframeView';
import { HifiView } from './HifiView';
import { MessageSquarePlus, Sparkles, Grid } from 'lucide-react';

interface DeviceFrameProps {
  deviceType: DeviceType;
  viewMode: ViewMode;
  currentScreenId: ScreenId;
  onNavigate: (target: ScreenId) => void;
  commentPins: CommentPin[];
  selectedPinId: string | null;
  onSelectPin: (pinId: string) => void;
  isPinningMode: boolean;
  onCreatePin: (coords: { xPercent: number; yPercent: number }) => void;
  showHotspotHints: boolean;
  showGridOverlay: boolean;
  heatmapCoords: TapCoordinate[];
  showHeatmap: boolean;
  onRecordTap: (x: number, y: number, isHotspot: boolean) => void;
  onHotspotTriggered?: (hotspotId: string) => void;
  scalePercent?: number;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  deviceType,
  viewMode,
  currentScreenId,
  onNavigate,
  commentPins,
  selectedPinId,
  onSelectPin,
  isPinningMode,
  onCreatePin,
  showHotspotHints,
  showGridOverlay,
  heatmapCoords,
  showHeatmap,
  onRecordTap,
  onHotspotTriggered,
  scalePercent = 100
}) => {
  const [pulseHotspots, setPulseHotspots] = useState(false);

  // Screen-specific comment pins
  const screenPins = commentPins.filter((p) => p.screenId === currentScreenId);

  // Handle clicking inside the screen canvas
  const handleScreenCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = Math.round((x / rect.width) * 100);
    const yPercent = Math.round((y / rect.height) * 100);

    // If currently in Pinning Mode, drop pin
    if (isPinningMode) {
      onCreatePin({ xPercent, yPercent });
      return;
    }

    // Check if clicked element was a hotspot
    const target = e.target as HTMLElement;
    const isHotspot = !!(target.closest('[data-hotspot]') || target.closest('button') || target.tagName === 'BUTTON');

    // Record tap for usability testing
    onRecordTap(xPercent, yPercent, isHotspot);

    // If clicked a dead zone, flash hotspot hints to guide user (like Figma does!)
    if (!isHotspot) {
      setPulseHotspots(true);
      setTimeout(() => setPulseHotspots(false), 900);
    }
  };

  const scale = scalePercent / 100;

  return (
    <div 
      className="relative flex items-center justify-center p-4 transition-transform duration-200"
      style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
    >
      {/* Device Enclosure */}
      <div
        className={`relative transition-all duration-300 ${
          deviceType === 'iphone-16-pro'
            ? 'w-[393px] h-[852px] rounded-[52px] p-[11px] bg-neutral-900 border-[3.5px] border-neutral-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/10'
            : deviceType === 'pixel-9'
            ? 'w-[393px] h-[852px] rounded-[44px] p-[10px] bg-neutral-900 border-[3.5px] border-neutral-700 shadow-2xl'
            : 'w-[393px] h-[852px] rounded-2xl bg-neutral-900 border border-neutral-700 shadow-xl overflow-hidden'
        }`}
      >
        {/* Dynamic Island / Bezel Top details */}
        {deviceType === 'iphone-16-pro' && (
          <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-40 flex items-center justify-between px-3 pointer-events-none shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
          </div>
        )}

        {deviceType === 'pixel-9' && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-40 pointer-events-none border border-neutral-800" />
        )}

        {/* Inner Screen Display Viewport */}
        <div
          onClick={handleScreenCanvasClick}
          className={`relative w-full h-full overflow-hidden bg-neutral-950 select-none ${
            deviceType === 'iphone-16-pro' ? 'rounded-[42px]' : deviceType === 'pixel-9' ? 'rounded-[36px]' : 'rounded-xl'
          } ${isPinningMode ? 'cursor-crosshair' : ''}`}
        >
          {/* Split Mode or Single Mode */}
          {viewMode === 'split' ? (
            <div className="relative w-full h-full grid grid-cols-2 divide-x divide-neutral-700">
              <div className="w-full h-full overflow-hidden">
                <WireframeView 
                  screenId={currentScreenId} 
                  onNavigate={onNavigate} 
                  showAnnotations={false} 
                />
              </div>
              <div className="w-full h-full overflow-hidden">
                <HifiView 
                  screenId={currentScreenId} 
                  onNavigate={onNavigate} 
                  onHotspotClick={onHotspotTriggered} 
                />
              </div>
            </div>
          ) : viewMode === 'wireframe' ? (
            <WireframeView 
              screenId={currentScreenId} 
              onNavigate={onNavigate} 
              showAnnotations={true} 
            />
          ) : (
            <HifiView 
              screenId={currentScreenId} 
              onNavigate={onNavigate} 
              onHotspotClick={onHotspotTriggered} 
            />
          )}

          {/* 8pt Grid Overlay */}
          {showGridOverlay && (
            <div 
              className="absolute inset-0 pointer-events-none z-30 opacity-25"
              style={{
                backgroundImage: 'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
                backgroundSize: '8px 8px'
              }}
            />
          )}

          {/* Hotspot Hints Highlight Flash */}
          {(showHotspotHints || pulseHotspots) && (
            <div className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300">
              {/* Highlight interactive zones with Figma blue glow */}
              <div className="absolute inset-0 bg-blue-500/10 border-2 border-blue-400/30 animate-pulse pointer-events-none" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600/90 text-white text-[11px] font-mono rounded-full backdrop-blur-md shadow-lg">
                Interactive Hotspots Active
              </div>
            </div>
          )}

          {/* Usability Heatmap Tap Overlays */}
          {showHeatmap && (
            <div className="absolute inset-0 pointer-events-none z-40 bg-black/30 backdrop-blur-[0.5px]">
              {heatmapCoords
                .filter((p) => p.screenId === currentScreenId)
                .map((tap) => (
                  <div
                    key={tap.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ left: `${tap.x}%`, top: `${tap.y}%` }}
                  >
                    <div className={`w-8 h-8 rounded-full ${tap.isHotspot ? 'bg-emerald-500/40 border-2 border-emerald-400' : 'bg-rose-500/50 border-2 border-rose-400'} blur-[2px] animate-ping opacity-75`} />
                    <div className={`w-3.5 h-3.5 rounded-full ${tap.isHotspot ? 'bg-emerald-400' : 'bg-rose-400'} shadow-md -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2`} />
                  </div>
                ))}
            </div>
          )}

          {/* Comment Pin Badges */}
          {screenPins.map((pin, idx) => (
            <button
              key={pin.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectPin(pin.id);
              }}
              style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-50 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-transform duration-150 cursor-pointer shadow-lg ${
                selectedPinId === pin.id
                  ? 'bg-amber-400 text-neutral-950 scale-125 ring-4 ring-amber-400/30'
                  : pin.resolved
                  ? 'bg-neutral-700 text-neutral-300 ring-2 ring-neutral-600'
                  : 'bg-rose-600 text-white hover:scale-110 ring-2 ring-white/80'
              }`}
              title={`${pin.authorName} (${pin.authorRole}): ${pin.content}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
