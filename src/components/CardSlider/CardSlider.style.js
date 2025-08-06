import styled from 'styled-components';

export const SliderWrapper = styled.div`
  position: relative;
  width: min(1200px, 100%);
  margin: 24px auto 0;
  padding-inline: clamp(8px, 4vw, 56px);
  box-sizing: border-box;
`;

export const Track = styled.div`
  display: flex;
  gap: 20px;

  /* 좌우 가장자리 여백 (첫/마지막 카드가 잘리지 않도록) */
  --edge-pad: clamp(16px, 4vw, 56px);
  padding: 10px var(--edge-pad) 24px;

  overflow-x: auto;
  overscroll-behavior-x: contain;

  /* 스냅/스무스: 기본은 스냅 on */
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scroll-padding-left: var(--edge-pad);
  scroll-padding-right: var(--edge-pad);

  /* 자동 재생 중에는 스냅/스무스 off (끊김 방지) */
  &[data-autoplay='true'] {
    scroll-snap-type: none;
    scroll-behavior: auto;
  }

  /* 드래그 중에도 스냅/스무스 off */
  &[data-dragging='true'] {
    scroll-snap-type: none;
    scroll-behavior: auto;
    cursor: grabbing;
  }

  /* 마우스 드래그 UX 개선 */
  cursor: grab;
  user-select: none;

  /* 모바일에서 관성 스크롤 */
  -webkit-overflow-scrolling: touch;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE/레거시 Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    /* Chromium/Safari */
    display: none;
    width: 0;
    height: 0;
  }
`;

export const CardItem = styled.div`
  scroll-snap-align: start;
`;

const ArrowBase = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 999px;
  color: ${({ theme }) => theme.color.primary};
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.background};
  box-shadow: ${({ theme }) =>
    `0 0 0 3px color-mix(in srgb, ${theme.color.primary} 10%, transparent)`};
  cursor: pointer;
  font-size: 22px;
  line-height: 1;
  display: grid;
  place-items: center;
  user-select: none;

  &:hover {
    background: ${({ theme }) => theme.color.background};
  }
  &:active {
    transform: translateY(-50%) scale(0.98);
  }
`;

export const ArrowLeft = styled(ArrowBase)`
  left: 8px;
`;
export const ArrowRight = styled(ArrowBase)`
  right: 8px;
`;
