import { useEffect } from 'react';

export function useAutoplayCarousel(
  trackRef,
  {
    enabled = true,
    speed = 24,
    loop = true,
    setWidth = 0,
    canScroll = true,
    resumeDelay = 1200,
    draggingRef, // 선택(ref<boolean>)
  } = {},
) {
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !enabled || !canScroll) return;

    let rafId = 0;
    let prevTs;
    let resumeTimer = 0;
    const pxPerSec = Math.max(6, speed);

    const stepFrame = (ts) => {
      if (prevTs != null && !(draggingRef && draggingRef.current)) {
        const dt = (ts - prevTs) / 1000;
        const dx = pxPerSec * dt;
        if (loop && setWidth > 0) {
          el.scrollLeft += dx;
          if (el.scrollLeft >= setWidth * 2) el.scrollLeft -= setWidth;
          else if (el.scrollLeft < 0) el.scrollLeft += setWidth;
        } else {
          const max = el.scrollWidth - el.clientWidth;
          el.scrollLeft += dx;
          if (el.scrollLeft >= max - 1) el.scrollLeft = 0;
        }
      }
      prevTs = ts;
      rafId = requestAnimationFrame(stepFrame);
    };

    const start = () => {
      if (!rafId) {
        prevTs = undefined;
        el.setAttribute('data-autoplay', 'true');
        rafId = requestAnimationFrame(stepFrame);
      }
    };
    const stop = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      el.removeAttribute('data-autoplay');
    };
    const pause = () => {
      stop();
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        if (trackRef.current && trackRef.current.scrollWidth > trackRef.current.clientWidth + 1) {
          start();
        }
      }, resumeDelay);
    };

    const onPointerDown = () => pause();
    const onWheel = () => pause();
    const onTouchStart = () => pause();

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('wheel', onWheel, { passive: true });
    el.addEventListener('touchstart', onTouchStart, { passive: true });

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    start();
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVis);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      if (resumeTimer) clearTimeout(resumeTimer);
    };
  }, [trackRef, enabled, speed, loop, setWidth, canScroll, resumeDelay, draggingRef]);
}
