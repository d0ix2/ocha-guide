import { useEffect } from 'react';

export function useAutoplayCarousel(
  trackRef,
  {
    enabled = true,
    speed = 24, // px/sec (CSS px)
    loop = true,
    setWidth = 0,
    canScroll = true,
    resumeDelay = 1200,
    draggingRef, // ref<boolean>
    mobileBoost = 1.6, // 모바일 가속 배수 (필요시 조정)
  } = {},
) {
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !enabled || !canScroll) return;

    let rafId = 0;
    let prevTs;
    let resumeTimer = 0;
    let acc = 0; // 소수점 누적

    // 모바일 단말 단순 감지(충분히 보수적으로)
    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);

    const base = Math.max(6, speed);
    const pxPerSec = base * (isMobile ? mobileBoost : 1);

    const stepFrame = (ts) => {
      if (prevTs != null && !(draggingRef && draggingRef.current)) {
        const dt = (ts - prevTs) / 1000;
        acc += pxPerSec * dt; // 소수점 누적

        if (loop && setWidth > 0) {
          // 정수 단위로만 실제 스크롤 반영
          const intStep = acc > 0 ? Math.floor(acc) : Math.ceil(acc);
          if (intStep !== 0) {
            el.scrollLeft += intStep;
            acc -= intStep; // 잔여 소수점 유지
            if (el.scrollLeft >= setWidth * 2) el.scrollLeft -= setWidth;
            else if (el.scrollLeft < 0) el.scrollLeft += setWidth;
          }
        } else {
          const max = el.scrollWidth - el.clientWidth;
          const intStep = acc > 0 ? Math.floor(acc) : Math.ceil(acc);
          if (intStep !== 0) {
            el.scrollLeft += intStep;
            acc -= intStep;
            if (el.scrollLeft >= max - 1) el.scrollLeft = 0;
          }
        }
      }
      prevTs = ts;
      rafId = requestAnimationFrame(stepFrame);
    };

    const start = () => {
      if (!rafId) {
        prevTs = undefined;
        acc = 0;
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

    // 이벤트: pointerdown만으로 충분. (touchstart는 pointerdown으로 커버되는데 중복으로 pause 유발 가능)
    const onPointerDown = () => pause();
    const onWheel = () => pause();

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('wheel', onWheel, { passive: true });

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    start();
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVis);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('wheel', onWheel);
      if (resumeTimer) clearTimeout(resumeTimer);
    };
  }, [trackRef, enabled, speed, loop, setWidth, canScroll, resumeDelay, draggingRef, mobileBoost]);
}
