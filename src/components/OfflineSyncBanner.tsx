import React from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface OfflineSyncBannerProps {
  isOnline: boolean;
  pendingCount: number;
  isSyncing: boolean;
  onManualSync: () => void;
  lastSyncTime: string | null;
}

export const OfflineSyncBanner: React.FC<OfflineSyncBannerProps> = ({
  isOnline,
  pendingCount,
  isSyncing,
  onManualSync,
  lastSyncTime,
}) => {
  if (isOnline && pendingCount === 0) {
    return null; // Clean state, no banner needed
  }

  return (
    <div
      className={`w-full px-4 py-2.5 transition-colors border-b text-xs flex flex-wrap items-center justify-between gap-2 ${
        !isOnline
          ? 'bg-amber-950/90 text-amber-200 border-amber-800'
          : 'bg-cyan-950/90 text-cyan-200 border-cyan-800'
      }`}
    >
      <div className="flex items-center gap-2">
        {!isOnline ? (
          <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
        ) : (
          <Wifi className="w-4 h-4 text-cyan-400 shrink-0" />
        )}
        <span>
          {!isOnline
            ? `You are currently offline. You can browse cached courses, view placements, and compose forum posts (${pendingCount} queued for auto-sync).`
            : `Back online! ${pendingCount} pending offline update(s) ready to sync to server.`}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {lastSyncTime && (
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            Last synced: {lastSyncTime}
          </span>
        )}

        <button
          id="manual-sync-trigger-btn"
          disabled={!isOnline || isSyncing}
          onClick={onManualSync}
          className={`px-2.5 py-1 rounded font-medium flex items-center gap-1.5 transition-all ${
            !isOnline
              ? 'opacity-60 cursor-not-allowed bg-slate-800 text-slate-400'
              : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow'
          }`}
        >
          <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
        </button>
      </div>
    </div>
  );
};
