// ThemeSelector.style.js (수정안)
import styled from 'styled-components';

export const ThemeSelectorWrapper = styled.div`
  position: fixed;
  /* top right bottom left 순서 */
  inset: auto 20px 20px auto;
  width: max-content;      /* ← 내용만큼만 차지 (중요) */
  z-index: 1000;           /* 다른 요소 위로 */
`;

export const ToggleButton = styled.div`
  cursor: pointer;
  user-select: none;
  inline-size: 40px;       /* width 대신 inline-size 사용해도 OK */
  block-size: 40px;        /* height 대신 block-size */
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.coloredText};
  display: inline-flex;    /* ← 고정 요소 내부 폭 최소화 */
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.color.primary};
  transform: translateZ(0);
`;

export const Dropdown = styled.div`
  position: absolute;
  bottom: 48px;
  right: 0;
  min-width: 90px;
  background: ${({ theme }) => theme.color.primary};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 8px;
  padding: 0.5rem;
  margin: 0;               /* ← 여백으로 외부로 밀리지 않게 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const Option = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.color.border};

  &:hover {
    color: ${({ theme }) => theme.color.coloredText};
  }
`;
