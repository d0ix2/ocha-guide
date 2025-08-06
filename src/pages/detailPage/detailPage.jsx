// src/pages/detailPage/detailPage.jsx
import { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { guideList } from '../../data/guideList';
import * as S from './detailPage.style';

// 🚩 src 내부의 .md 파일들을 번들에 포함시키고 URL을 얻기 위한 컨텍스트
const ctx = require.context('../../data/guides', true, /\.md$/);

const LANGS = ['ja', 'en', 'ko'];

export default function DetailPage() {
  const { id } = useParams();
  const { search } = useLocation();

  const lang = useMemo(() => {
    const q = new URLSearchParams(search).get('lang');
    return LANGS.includes(q || '') ? q : 'ja';
  }, [search]);

  const [md, setMd] = useState('');
  const [err, setErr] = useState(null);
  const [resolvedLang, setResolvedLang] = useState(lang);

  const meta = useMemo(() => guideList.find((it) => it.id === id) || null, [id]);
  const base = useMemo(() => meta?.base || `${id}/${id}`, [meta, id]);

  // (필요 시 제목 표시용 — 기능 변화 없음, 사용하지 않으면 유지만 해도 OK)
  const title =
    meta?.i18n?.[lang]?.title ??
    meta?.i18n?.ja?.title ??
    meta?.i18n?.en?.title ??
    meta?.i18n?.ko?.title ??
    '';

  useEffect(() => {
    if (!meta) return;
    let alive = true;
    setMd('');
    setErr(null);

    // 요청 언어 → 나머지 언어 순으로 fallback
    const order = [lang, ...LANGS.filter((l) => l !== lang)];

    (async () => {
      for (const l of order) {
        const key = `./${base}-${l}.md`; // require.context 키는 ./ 로 시작해야 함
        let url;
        try {
          url = ctx(key); // 번들된 정적 URL(string) 반환
        } catch {
          continue; // 해당 언어 파일이 없으면 다음 언어로
        }

        try {
          const r = await fetch(url, { cache: 'no-store' });
          if (!r.ok) continue;
          const text = await r.text();
          if (!alive) return;
          setMd(text);
          setResolvedLang(l);
          return;
        } catch {
          // 다음 언어 시도
        }
      }
      if (alive) setErr(new Error('Markdown not found in bundle'));
    })();

    return () => {
      alive = false;
    };
  }, [meta, base, lang]);

  if (!meta) return <div style={{ padding: 24 }}>Not found: {id}</div>;

  return (
    <S.Container>
      <S.Breadcrumb>
        <Link to="/">← Back</Link>
      </S.Breadcrumb>

      {err && <S.ErrorBox>⚠️ {String(err)}</S.ErrorBox>}
      {!err && !md && <div>Loading...</div>}

      {!err && md && (
        <article className="markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
        </article>
      )}
    </S.Container>
  );
}
