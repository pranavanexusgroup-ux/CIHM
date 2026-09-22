import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  Users,
  MessageSquare,
  Bell,
  Wifi,
  WifiOff,
  Smartphone,
  Monitor,
  PhoneCall,
  Menu,
  X,
  ShieldCheck,
  Share2,
  TrendingUp,
  Star,
  Sparkles,
  Globe,
  Settings,
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NavbarProps {
  isOnline: boolean;
  pendingSyncCount: number;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  isMobileDeviceMode: boolean;
  onToggleMobileMode: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenShareModal: () => void;
  onOpenLaunchCourse: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isOnline,
  pendingSyncCount,
  notifications,
  onOpenNotifications,
  isMobileDeviceMode,
  onToggleMobileMode,
  activeSection,
  onNavigate,
  onOpenShareModal,
  onOpenLaunchCourse,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'roadmap', label: 'Career Roadmap', highlight: true },
    { id: 'fellowships', label: 'UK Fellowships' },
    { id: 'dashboard', label: 'Placement Dashboard' },
    { id: 'placements', label: 'Recruiters' },
    { id: 'toppers', label: 'Toppers' },
    { id: 'reviews', label: 'Google Reviews' },
    { id: 'forum', label: 'Community' },
    { id: 'study-connect', label: 'Study Connect' },
    { id: 'admin', label: 'Admin Panel', isAdmin: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#14245c] text-white shadow-xl border-b border-blue-600/40">
      {/* Top Brand Utility Ribbon - CIHM Palette (Strictly No Black) */}
      <div className="bg-[#0f1f4b] px-4 py-1.5 border-b border-blue-900/60 text-xs flex items-center justify-between text-blue-100">
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline font-medium">
            105/59 DumDum Road, Motijheel, Kolkata-700074
          </span>
          <a
            href="tel:9073737888"
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>9073737888 / 9073737444</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          {/* Online / Offline Sync status indicator */}
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
              isOnline
                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/50'
                : 'bg-amber-900/60 text-amber-300 border border-amber-500/50'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3 h-3 text-emerald-400" />
                <span>Online {pendingSyncCount > 0 ? `(${pendingSyncCount} Syncing)` : 'Synced'}</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-amber-400" />
                <span>Offline Mode ({pendingSyncCount} Queued)</span>
              </>
            )}
          </div>

          {/* Quick Course Launch Button */}
          <button
            onClick={onOpenLaunchCourse}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-500 text-[#073947] hover:bg-amber-400 transition-colors shadow-xs"
          >
            <Sparkles className="w-3 h-3" />
            <span>+ Launch Course</span>
          </button>

          {/* Mobile frame preview switcher */}
          <button
            id="device-frame-toggle-btn"
            onClick={onToggleMobileMode}
            className="hidden md:inline-flex items-center gap-1 text-teal-200 hover:text-white transition-colors text-xs"
            title="Switch between mobile screen preview and full desktop layout"
          >
            {isMobileDeviceMode ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-cyan-300" />
                <span>Full View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-cyan-300" />
                <span>Mobile Preview</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
        {/* Brand & Logo with CIHM official styling */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          id="cihm-brand-logo"
        >
          <img
            src="/assets/cihm-logo.svg"
            alt="CIHM Kolkata Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-md border-2 border-amber-400/80 group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-wider text-white font-['Outfit'] drop-shadow-sm">
                CIHM
              </span>
              <span className="text-[10px] px-1.5 py-0.5 bg-amber-500 text-[#14245c] font-black rounded shadow-xs">
                KOLKATA
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-blue-100 font-semibold tracking-tight">
              Central Institute of Healthcare &amp; Management
            </p>
          </div>
        </div>

        {/* Desktop Nav Items (Multi-Page Navigation) */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-[#14245c] shadow-sm'
                    : item.highlight
                    ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-400/40'
                    : item.isAdmin
                    ? 'bg-blue-800/60 text-blue-100 hover:bg-blue-700 border border-blue-400/40'
                    : 'text-blue-50 hover:text-white hover:bg-[#1b3280]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions Row (Share, Notifications, Mobile Menu) */}
        <div className="flex items-center gap-2">
          {/* Quick share button */}
          <button
            onClick={onOpenShareModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-[#14245c] shadow-sm transition-all active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share &amp; Certs</span>
          </button>

          {/* Notifications Bell */}
          <button
            id="notifications-bell-btn"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-[#1b3280] hover:bg-[#233f99] text-blue-100 border border-blue-400/40 transition-colors"
            title="View alerts & push notification settings"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-[#14245c] text-[10px] font-black rounded-full flex items-center justify-center shadow-xs animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            id="mobile-nav-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-[#1b3280] text-white border border-blue-400/40"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-teal-800 bg-[#052b36] px-4 py-3 space-y-1">
          <div className="grid grid-cols-2 gap-1.5 pb-2">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-left transition-all ${
                    isActive
                      ? 'bg-white text-[#073947]'
                      : item.highlight
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                      : 'text-teal-100 hover:bg-[#09495c]'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-teal-800 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenLaunchCourse();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-[#073947] text-xs font-black"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Course</span>
            </button>

            <button
              onClick={() => {
                onOpenShareModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1 text-xs text-amber-300 font-semibold"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share App</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
