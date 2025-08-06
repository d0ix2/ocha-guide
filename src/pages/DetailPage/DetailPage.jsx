import { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { guideList } from '../../data/guideList';
import * as S from './DetailPage.style';

// src 내부의 .md 파일들을 번들에 포함시키고 URL을 얻기 위한 컨텍스트
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

  // eslint-disable-next-line no-unused-vars
  const [resolvedLang, setResolvedLang] = useState(lang);

  const meta = useMemo(() => guideList.find((it) => it.id === id) || null, [id]);
  const base = useMemo(() => meta?.base || `${id}/${id}`, [meta, id]);

  // 페이지 상위 타이틀: 현재 사용 x
  // eslint-disable-next-line no-unused-vars
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

    const order = [lang, ...LANGS.filter((l) => l !== lang)];

    (async () => {
      for (const l of order) {
        const key = `./${base}-${l}.md`;
        let url;
        try {
          url = ctx(key);
        } catch {
          continue;
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
