// src/pages/ServiceInfoPage/ServiceInfoPage.jsx
import { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as S from './ServiceInfoPage.style';

const ctx = require.context('../../data/serviceInfo', false, /\.md$/);

const LANGS = ['ja', 'en', 'ko'];

export default function ServiceInfoPage() {
  const { lang: langParam } = useParams();
  const { search } = useLocation();

  const lang = useMemo(() => {
    const q = new URLSearchParams(search).get('lang');
    const candidate = q || langParam || 'ja';
    return LANGS.includes(candidate) ? candidate : 'ja';
  }, [search, langParam]);

  const [md, setMd] = useState('');
  const [err, setErr] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [resolvedLang, setResolvedLang] = useState(lang);

  useEffect(() => {
    let alive = true;
    setMd('');
    setErr(null);

    const order = [lang, ...LANGS.filter((l) => l !== lang)];

    (async () => {
      for (const l of order) {
        const key = `./serviceInfo-${l}.md`;
        let url;
        try {
          url = ctx(key); // 번들에서 URL 추출
        } catch {
          // 해당 언어 파일이 없는 경우 다음 언어 시도
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
  }, [lang]);

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
