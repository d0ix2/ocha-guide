import { useEffect } from 'react';

export function useLoopNormalize(trackRef, { loop = true, setWidth = 0, draggingRef } = {}) {
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !loop || setWidth <= 0) return;

    const normalize = () => {
      if (draggingRef && draggingRef.current) return; // 드래그 중엔 보정 X
      if (el.scrollLeft >= setWidth * 2) el.scrollLeft -= setWidth;
      else if (el.scrollLeft < 0) el.scrollLeft += setWidth;
    };
    el.addEventListener('scroll', normalize);
    return () => el.removeEventListener('scroll', normalize);
  }, [trackRef, loop, setWidth, draggingRef]);
}
