import styled from 'styled-components';

export const Wrapper = styled.header`
  width: 100%;
  box-sizing: border-box;
  padding: 24px 24px 8px;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const NavBtn = styled.button`
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.primary};
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transform: translateZ(0);
  transition:
    transform 120ms ease,
    background 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;

  &:hover {
    transform: scale(1.06);
    border-color: ${({ theme }) => theme.color.primary};
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) =>
      `0 0 0 3px color-mix(in srgb, ${theme.color.primary} 25%, transparent)`};
  }
`;

export const LangGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const LangBtn = styled.button`
  border: none;
  background: ${({ $active, theme }) => ($active ? theme.color.primary : theme.color.background)};
  color: ${({ $active, theme }) => ($active ? theme.color.background : theme.color.border)};
  padding: 6px 10px;
  border-radius: 999px;
  cursor: pointer;
  transform: translateZ(0);
  transition:
    transform 120ms ease,
    background 160ms ease,
    color 160ms ease;
  font-weight: 600;
  letter-spacing: 0.02em;

  &:hover {
    transform: scale(1.06);
    color: ${({ theme }) => theme.color.background};
    background: ${({ theme }) => theme.color.border};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.background};
    outline-offset: 2px;
  }
`;

export const TitleArea = styled.div`
  text-align: center;
  margin: 24px 0;
`;

export const TitleLine1 = styled.h1`
  margin: 0;
  font-weight: 800;
  line-height: 1.15;
  font-size: clamp(28px, 4.4vw, 44px);
  color: ${({ theme }) => theme.color.primary};
`;

export const TitleLine2 = styled.h2`
  margin: 6px 0 0;
  font-weight: 900;
  line-height: 1.1;
  font-size: clamp(36px, 6.5vw, 64px);
  color: ${({ theme }) => theme.color.primary};
`;

export const SearchBox = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  margin: 50px auto;
`;

export const SearchInput = styled.input`
  width: min(300px, 88vw);
  height: 44px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  transition:
    box-shadow 120ms ease,
    border-color 120ms ease;

  &:focus {
    box-shadow: ${({ theme }) =>
      `0 0 0 3px color-mix(in srgb, ${theme.color.primary} 10%, transparent)`};
  }
`;

export const ClearBtn = styled.button`
  position: absolute;
  right: calc(50% - min(300px, 88vw) / 2 + 8px);
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 999px;
  color: ${({ theme }) => theme.color.primary};
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.background};
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  display: grid;
  place-items: center;
  transition:
    transform 120ms ease,
    background 160ms ease;

  &:hover {
    transform: translateY(-50%) scale(1.06);
    background: ${({ theme }) => theme.color.background};
  }
`;
