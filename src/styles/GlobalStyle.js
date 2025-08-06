import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* 기본 리셋 */
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }

  body {
    margin: 0;
    overflow-x: hidden;
    font-optical-sizing: auto;
    font-style: normal;
    font-family: ${({ theme }) => theme.font || 'inherit'};
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text || 'inherit'};
  }

  button { outline: none; border: none; cursor: pointer; }

  /* 공통 요소 마진 제거 */
  h1,h2,h3,h4,h5,h6,p,ul,ol,figure { margin: 0; }
  img, svg { display: block; max-width: 100%; height: auto; }
  a { color: inherit; text-decoration: none; }
  ::placeholder { color: inherit; opacity: 1; }

  /* 단어 줄바꿈 */
  p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }

  /* 반응형 헤딩 크기 */
  h1 { font-weight: 800; line-height: 1.2;  font-size: clamp(24px, 3.2vw, 32px); }
  h2 { font-weight: 700; line-height: 1.25; font-size: clamp(20px, 2.6vw, 26px); }
  h3 { font-weight: 700; line-height: 1.3;  font-size: clamp(18px, 2.2vw, 22px); }
  h4 { font-weight: 600; line-height: 1.35; font-size: clamp(16px, 2vw, 20px); }
  h5 { font-weight: 600; line-height: 1.4;  font-size: clamp(15px, 1.8vw, 18px); }
  h6 { font-weight: 600; line-height: 1.45; font-size: clamp(14px, 1.6vw, 16px); }
  p  { line-height: 1.8; }

  /* 내비게이션 등에서만 리스트 마커 제거 */
  nav ul, nav ol { list-style: none; padding: 0; }

  /* ── Markdown 영역 기본 타이포 ── */
  :where(article, .markdown, [data-markdown]) {
    line-height: 1.8;
  }

  :where(article, .markdown, [data-markdown]) h1 { margin: 24px 0 12px; }
  :where(article, .markdown, [data-markdown]) h2 { margin: 20px 0 10px; }
  :where(article, .markdown, [data-markdown]) h3 { margin: 50px 0 0; }
  :where(article, .markdown, [data-markdown]) p  { margin: 8px 0; }

  /* 리스트: 들여쓰기/가독성 강화 */
  :where(article, .markdown, [data-markdown]) ul {
    list-style: disc;
    padding-left: clamp(1.25rem, 3.5vw, 2.25rem);
    margin: 12px 0;
    list-style-position: outside;
  }
  :where(article, .markdown, [data-markdown]) ol {
    list-style: decimal;
    padding-left: clamp(1.25rem, 3.5vw, 2.25rem);
    margin: 12px 0;
    list-style-position: outside;
  }
  :where(article, .markdown, [data-markdown]) ul ul,
  :where(article, .markdown, [data-markdown]) ol ol {
    padding-left: clamp(1rem, 2.5vw, 1.75rem);
    margin: 8px 0;
  }
  :where(article, .markdown, [data-markdown]) li { margin: 6px 0; }
  :where(article, .markdown, [data-markdown]) li::marker {
    color: ${({ theme }) => theme.color?.coloredText || theme.color?.link || '#2563eb'};
    font-size: 0.95em;
  }

  :where(article, .markdown, [data-markdown]) a {
    color: ${({ theme }) => theme.color.link || '#2563eb'};
  }
  :where(article, .markdown, [data-markdown]) a:hover { text-decoration: underline; }

  :where(article, .markdown, [data-markdown]) code {
    background: #f6f8fa;
    padding: .2em .4em;
    border-radius: 4px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.95em;
  }

  :where(article, .markdown, [data-markdown]) pre {
    background: #0f172a;
    color: #f8fafc;
    padding: 12px 14px;
    border-radius: 8px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  :where(article, .markdown, [data-markdown]) blockquote {
    border-left: 3px solid #e5e7eb;
    margin: 12px 0;
    padding-left: 12px;
    color: #6b7280;
  }

  :where(article, .markdown, [data-markdown]) hr {
    border: none;
    height: 1px;
    background: #e5e7eb;
    margin-block: clamp(16px, 4vw, 40px);
  }
`;
