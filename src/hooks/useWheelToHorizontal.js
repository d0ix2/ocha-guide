import { useEffect } from 'react';

export function useWheelToHorizontal(trackRef, { factor = 1.0 } = {}) {
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // 세로 입력을 가로 스크롤로 전환
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * factor;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [trackRef, factor]);
}
