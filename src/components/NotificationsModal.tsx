import React, { useState } from 'react';
import {
  Bell,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Send,
  Sliders,
  ShieldCheck,
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onSendCustomNotification: (title: string, message: string, type: any) => Promise<void>;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onSendCustomNotification,
}) => {
  const [permissionStatus, setPermissionStatus] = useState<string>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [prefPlacements, setPrefPlacements] = useState(true);
  const [prefCourses, setPrefCourses] = useState(true);
  const [prefStudy, setPrefStudy] = useState(true);
  const [prefForum, setPrefForum] = useState(true);

  // Custom notification sender state
  const [customTitle, setCustomTitle] = useState('');
  const [customMsg, setCustomMsg] = useState('');
  const [customType, setCustomType] = useState('placement');
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const requestBrowserPermission = async () => {
    if (typeof Notification !== 'undefined') {
      try {
        const result = await Notification.requestPermission();
        setPermissionStatus(result);
        if (result === 'granted') {
          new Notification('CIHM Kolkata Notifications Enabled!', {
            body: 'You will receive real-time alerts on hospital placements, course syllabus, and study groups.',
            icon: '/assets/cihm-logo.svg',
          });
        }
      } catch (err) {
        console.error('Notification error:', err);
      }
    }
  };

  const handleSendTestNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customMsg.trim()) return;

    await onSendCustomNotification(customTitle, customMsg, customType);

    if (permissionStatus === 'granted' && typeof Notification !== 'undefined') {
      new Notification(`CIHM Alert: ${customTitle}`, {
        body: customMsg,
        icon: '/assets/cihm-logo.svg',
      });
    }

    setSentSuccess(true);
    setCustomTitle('');
    setCustomMsg('');
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base font-['Outfit']">Personalized Push Alerts</h3>
              <p className="text-xs text-slate-400">Instant placement &amp; academic notifications</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          {/* Permission Status Box */}
          <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-900 block text-xs">
                Browser Push Notifications
              </span>
              <span className="text-slate-600 text-[11px]">
                Status: {permissionStatus === 'granted' ? '✅ Active & Subscribed' : '⚠️ Disabled / Pending'}
              </span>
            </div>

            {permissionStatus !== 'granted' && (
              <button
                onClick={requestBrowserPermission}
                className="px-3 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs shadow transition-all active:scale-95 shrink-0"
              >
                Enable Notifications
              </button>
            )}
          </div>

          {/* Preferences Toggles */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-700" />
              <span>Personalized Notification Channels</span>
            </h4>
            <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <label className="flex items-center justify-between p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-800 text-xs block">
                    Hospital Recruitment &amp; Placement Drives
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Get alerted when Apollo, Fortis, or Medica post openings
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={prefPlacements}
                  onChange={(e) => setPrefPlacements(e.target.checked)}
                  className="w-4 h-4 text-cyan-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-800 text-xs block">
                    Live Peer Study Rooms &amp; Whiteboards
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Alerts when faculty or fellows start a discussion room
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={prefStudy}
                  onChange={(e) => setPrefStudy(e.target.checked)}
                  className="w-4 h-4 text-cyan-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-800 text-xs block">
                    Course Updates &amp; Scholarship Schemes
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Announcements regarding 50% merit scholarships
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={prefCourses}
                  onChange={(e) => setPrefCourses(e.target.checked)}
                  className="w-4 h-4 text-cyan-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-800 text-xs block">
                    Community Forum Answers &amp; Mentions
                  </span>
                  <span className="text-[10px] text-slate-500">
                    When someone replies to your clinical diagnostic question
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={prefForum}
                  onChange={(e) => setPrefForum(e.target.checked)}
                  className="w-4 h-4 text-cyan-600 rounded"
                />
              </label>
            </div>
          </div>

          {/* Test / Broadcast Custom Notification */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-cyan-300 font-['Outfit'] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Broadcast a Push Notification (Live Simulation)</span>
            </h4>

            {sentSuccess && (
              <div className="p-2 bg-emerald-950/80 border border-emerald-700 text-emerald-300 rounded-lg text-xs text-center font-bold">
                ✓ Notification Dispatched &amp; Added to Hub!
              </div>
            )}

            <form onSubmit={handleSendTestNotification} className="space-y-2 text-xs">
              <input
                required
                type="text"
                placeholder="Notification Title (e.g. Medica Interview Shortlist)"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400"
              />
              <textarea
                required
                rows={2}
                placeholder="Notification message body..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400"
              />
              <div className="flex items-center justify-between pt-1">
                <select
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                >
                  <option value="placement">Placement Alert</option>
                  <option value="study">Study Group Alert</option>
                  <option value="course">Course Update</option>
                  <option value="admission">Scholarship Alert</option>
                </select>

                <button
                  type="submit"
                  className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white rounded-lg font-bold shadow active:scale-95 transition-all flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Notification</span>
                </button>
              </div>
            </form>
          </div>

          {/* Recent Notifications Feed */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Recent Alert History ({notifications.length})
              </h4>
              <button
                onClick={onMarkAllRead}
                className="text-xs font-semibold text-cyan-700 hover:text-cyan-900"
              >
                Mark all as read
              </button>
            </div>

            <div className="space-y-2.5">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                    !notif.read
                      ? 'bg-cyan-50/60 border-cyan-200'
                      : 'bg-white border-slate-200/80 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{notif.title}</span>
                    <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
