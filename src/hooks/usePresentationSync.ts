import { useCallback, useEffect, useRef } from 'react';

const CHANNEL_NAME = 'ai-presentation-sync';

type SyncMessage =
  | { type: 'slide'; index: number }
  | { type: 'request-state' }
  | { type: 'state'; index: number };

interface UsePresentationSyncOptions {
  role: 'presenter' | 'audience';
  current: number;
  onRemoteSlide?: (index: number) => void;
}

export function usePresentationSync({ role, current, onRemoteSlide }: UsePresentationSyncOptions) {
  const channelRef = useRef<BroadcastChannel | null>(null);
  const onRemoteSlideRef = useRef(onRemoteSlide);

  useEffect(() => {
    onRemoteSlideRef.current = onRemoteSlide;
  }, [onRemoteSlide]);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<SyncMessage>) => {
      const message = event.data;
      if (role !== 'audience') return;

      if (message.type === 'slide' || message.type === 'state') {
        onRemoteSlideRef.current?.(message.index);
      }
    };

    if (role === 'audience') {
      channel.postMessage({ type: 'request-state' } satisfies SyncMessage);
    }

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, [role]);

  useEffect(() => {
    if (role !== 'presenter' || !channelRef.current) return;
    channelRef.current.postMessage({ type: 'slide', index: current } satisfies SyncMessage);
  }, [role, current]);

  useEffect(() => {
    if (role !== 'presenter' || !channelRef.current) return;

    const channel = channelRef.current;
    const onRequest = (event: MessageEvent<SyncMessage>) => {
      if (event.data.type === 'request-state') {
        channel.postMessage({ type: 'state', index: current } satisfies SyncMessage);
      }
    };

    channel.addEventListener('message', onRequest);
    return () => channel.removeEventListener('message', onRequest);
  }, [role, current]);

  const broadcastSlide = useCallback((index: number) => {
    channelRef.current?.postMessage({ type: 'slide', index } satisfies SyncMessage);
  }, []);

  return { broadcastSlide };
}

export function getPresentationViewUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set('view', 'presentation');
  return url.toString();
}

export function openPresentationWindow() {
  return window.open(getPresentationViewUrl(), 'presentation-view', 'noopener,noreferrer,width=1280,height=720');
}
