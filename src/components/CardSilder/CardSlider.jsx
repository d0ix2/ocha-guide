import React, { useRef, useMemo } from 'react';
import { guideList as defaultGuides } from '../../data/guideList';
import Card from '../Card/Card';
import * as S from './CardSlider.style';

import { useCarouselMeasure } from '../../hooks/useCarouselMeasure';
import { useDragScroll } from '../../hooks/useDragScroll';
import { useWheelToHorizontal } from '../../hooks/useWheelToHorizontal';
import { useAutoplayCarousel } from '../../hooks/useAutoplayCarousel';
import { useLoopNormalize } from '../../hooks/useLoopNormalize';

function CardSlider({
  items = defaultGuides,
  lang = 'ja',
  loop = true,
  autoPlay = true,
  speed = 24,
  resumeDelay = 1200,
  dragScale = 0.6,
  dragThreshold = 8,
  wheelFactor = 1.0,
  showArrows = false,
  step = 1,
}) {
  const trackRef = useRef(null);

  // 렌더 아이템 (루프면 3배)
  const renderItems = useMemo(() => (loop ? [...items, ...items, ...items] : items), [items, loop]);

  // 1) 세트폭 측정 & 초기 위치
  const { setWidth, canScroll } = useCarouselMeasure(trackRef, items, { loop });

  // 2) 드래그 스크롤
  const draggingRef = useDragScroll(trackRef, { loop, setWidth, dragScale, dragThreshold });

  // 3) 휠 → 가로 스크롤
  useWheelToHorizontal(trackRef, { factor: wheelFactor });

  // 4) 자동 재생
  useAutoplayCarousel(trackRef, {
    enabled: autoPlay,
    speed,
    loop,
    setWidth,
    canScroll,
    resumeDelay,
    draggingRef,
  });

  // 5) 루프 보정
  useLoopNormalize(trackRef, { loop, setWidth, draggingRef });

  // (선택) 버튼 스텝 스크롤
  const scrollByStep = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    const cardWidth = card ? card.getBoundingClientRect().width : 260;
    const styles = getComputedStyle(el);
    const gap =
      parseFloat(
        styles.getPropertyValue('column-gap') || styles.getPropertyValue('gap') || '16px',
      ) || 16;
    const delta = (cardWidth + gap) * step * (dir === 'left' ? -1 : 1);
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const pickText = (item) => {
    const t = item.i18n?.[lang] ?? item.i18n?.ja ?? item.i18n?.en ?? item.i18n?.ko ?? {};
    return { title: t.title ?? '', caption: t.caption ?? '' };
  };

  return (
    <S.SliderWrapper>
      {showArrows && (
        <S.ArrowLeft onClick={() => scrollByStep('left')} aria-label="左へ">
          ‹
        </S.ArrowLeft>
      )}

      <S.Track
        ref={trackRef}
        data-autoplay={autoPlay ? 'true' : undefined}
        role="list"
        tabIndex={0}
      >
        {renderItems.map((g, idx) => {
          const { title, caption } = pickText(g);
          return (
            <S.CardItem key={`${g.id}-${idx}`} data-card role="listitem">
              <Card id={g.id} icon={g.icon} title={title} caption={caption} lang={lang} />
            </S.CardItem>
          );
        })}
      </S.Track>

      {showArrows && (
        <S.ArrowRight onClick={() => scrollByStep('right')} aria-label="右へ">
          ›
        </S.ArrowRight>
      )}
    </S.SliderWrapper>
  );
}

export default CardSlider;