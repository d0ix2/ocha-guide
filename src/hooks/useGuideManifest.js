import { useEffect, useState } from 'react';

// public/guides/manifest.json 을 가져와 캐시
const v = 4;
const MANIFEST_URL = `${process.env.PUBLIC_URL}/guides/manifest.json?v=${v}`;

let _cache = null;
let _inflight = null;

export default function useGuideManifest() {
  const [data, setData] = useState(_cache);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!_cache);

  useEffect(() => {
    if (_cache) return; // 이미 캐시됨
    if (!_inflight) {
      _inflight = fetch(MANIFEST_URL, { cache: 'no-cache' })
        .then((r) => {
          if (!r.ok) throw new Error(`Failed to load manifest: ${r.status}`);
          return r.json();
        })
        .then((json) => {
          _cache = json;
          return json;
        });
    }
    let alive = true;
    _inflight
      .then((json) => {
        if (!alive) return;
        setData(json);
        setLoading(false);
      })
      .catch((e) => {
        if (!alive) return;
        setError(e);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { data, error, loading };
}
