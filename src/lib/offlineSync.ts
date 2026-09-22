import { SyncQueueItem } from '../types';

const SYNC_QUEUE_KEY = 'cihm_offline_sync_queue';

export function getSyncQueue(): SyncQueueItem[] {
  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSyncQueue(queue: SyncQueueItem[]): void {
  try {
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  } catch (err) {
    console.error('Failed to save sync queue:', err);
  }
}

export function addToSyncQueue(item: Omit<SyncQueueItem, 'id' | 'timestamp' | 'status'>): SyncQueueItem {
  const newItem: SyncQueueItem = {
    ...item,
    id: `sync-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    timestamp: Date.now(),
    status: 'pending'
  };
  const current = getSyncQueue();
  saveSyncQueue([...current, newItem]);
  return newItem;
}

export function removeSyncedItems(ids: string[]): void {
  const current = getSyncQueue();
  const filtered = current.filter((item) => !ids.includes(item.id));
  saveSyncQueue(filtered);
}
