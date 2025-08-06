import { useLayoutEffect, useState } from 'react';

export function useCarouselMeasure(trackRef, items, { loop = true } = {}) {
  const [setWidth, setSetWidth] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const styles = getComputedStyle(el);
    const gap = parseFloat(
      styles.getPropertyValue('gap') ||
      styles.getPropertyValue('column-gap') ||
      '16px'
    ) || 16;

    // 첫 세트(items)의 총 너비 계산
    let total = 0;
    for (let i = 0; i < items.length; i += 1) {
      const node = el.children[i];
      if (!node) break;
      total += node.getBoundingClientRect().width + (i > 0 ? gap : 0);
    }
    setSetWidth(total);

    const overflow = el.scrollWidth > el.clientWidth + 1;
    setCanScroll(overflow);

    if (loop && overflow && total > 0) {
      el.scrollLeft = total; // 가운데 세트 시작점
    }
  }, [trackRef, items, loop]);

  return { setWidth, canScroll };
}
