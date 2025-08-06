import styled from 'styled-components';

export const CardWrapper = styled.div`
  flex: 0 0 auto;
  width: clamp(180px, 20vw, 240px);
  border-radius: 16px;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: ${({ theme }) =>
    `0 0 0 3px color-mix(in srgb, ${theme.color.primary} 10%, transparent)`};
  overflow: hidden;

  a {
    color: inherit;
    text-decoration: none;
    display: block;
  }
`;

export const Thumb = styled.div`
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6f7;
  overflow: hidden;
  padding: 10px 12px;

  /* 이미지일 때 */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 아이콘(SVG)일 때 */
  svg {
    display: block;
    width: clamp(80px, 56%, 100px);
    height: auto;
  }
`;

export const PlaceholderIcon = styled.span`
  font-size: 28px;
  opacity: 0.5;
`;

export const Body = styled.div`
  padding: 14px 16px 16px;
`;

export const Title = styled.h3`
  font-size: 18px;
  line-height: 1.35;
  margin: 0 0 6px;
  font-weight: 700;
`;

export const Caption = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.color.coloredText};
`;
