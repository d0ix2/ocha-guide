import { useEffect, useRef } from 'react';

export function useDragScroll(
  trackRef,
  { loop = true, setWidth = 0, dragScale = 0.6, dragThreshold = 8 } = {}
) {
  const draggingRef = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startLeft = 0;
    let hasMoved = false;

    const range = () => setWidth * 2;
    const wrapPos = (v) =>
      !loop || setWidth <= 0 ? v : ((v % range()) + range()) % range();

    // 드래그 종료 후 발생하는 '다음 클릭'을 1회 억제
    const suppressNextClick = () => {
      const onClickCapture = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        document.removeEventListener('click', onClickCapture, true);
      };
      document.addEventListener('click', onClickCapture, true);
      // (짧은 타임아웃으로도 가능하나, 1회 제거가 더 안전)
    };

    const onPointerDown = (e) => {
      isDown = true;
      hasMoved = false;
      draggingRef.current = false; // 아직 드래그 시작 아님
      startX = e.clientX;
      startLeft = el.scrollLeft;
      // ❌ setPointerCapture 사용하지 않습니다 — 링크 클릭 막힘 원인
      // el.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isDown) return;
      const rawDx = e.clientX - startX;

      if (!hasMoved) {
        if (Math.abs(rawDx) < dragThreshold) return; // 임계값 전: 클릭 취급
        hasMoved = true;
        draggingRef.current = true;
        el.setAttribute('data-dragging', 'true'); // 스냅/스무스 off
      }

      const dx = rawDx * dragScale;          // 감쇠 적용
      el.scrollLeft = wrapPos(startLeft - dx);
    };

    const endDrag = () => {
      if (!isDown) return;
      isDown = false;
      el.removeAttribute('data-dragging');

      if (hasMoved) {
        // 드래그로 끝났다면 다음 클릭 1회 억제(의도치 않은 네비 방지)
        suppressNextClick();
      }
      draggingRef.current = false;

      // 경계 보정(무한 루프)
      if (loop && setWidth > 0) {
        const r = range();
        el.scrollLeft = ((el.scrollLeft % r) + r) % r;
      }
    };

    const onPointerUp = () => endDrag();
    const onPointerCancel = () => endDrag();

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
    };
  }, [trackRef, loop, setWidth, dragScale, dragThreshold]);

  return draggingRef; // autoplay/normalize 훅들이 참조
}
