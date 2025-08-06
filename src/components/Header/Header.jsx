import React, { useState } from 'react';
import * as S from './Header.style';

const LANGS = [
  { label: 'JP', value: 'ja' },
  { label: 'EN', value: 'en' },
  { label: 'KO', value: 'ko' },
];

// 헤더 전용 텍스트 사전 (키: ja/en/ko)
const UI_TEXT = {
  ja: {
    title1: 'お茶の水女子大学',
    title2: '留学生 生活ガイド',
    searchPlaceholder: 'キーワードを検索',
    clear: 'クリア',
  },
  en: {
    title1: 'Ochanomizu University',
    title2: 'Life Guide for International Students',
    searchPlaceholder: 'Search by keyword',
    clear: 'Clear',
  },
  ko: {
    title1: '오차노미즈여자대학교',
    title2: '유학생 생활 가이드',
    searchPlaceholder: '키워드로 검색',
    clear: '지우기',
  },
};

export default function Header({ onSearch, onLangChange }) {
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState('ja'); // ← locale 코드로 관리
  const t = UI_TEXT[lang] ?? UI_TEXT.ja;

  const handleClear = () => {
    setQuery('');
    onSearch && onSearch('');
  };

  const handleInput = (e) => {
    const v = e.target.value;
    setQuery(v);
    onSearch && onSearch(v);
  };

  const selectLang = (value) => {
    setLang(value);
    onLangChange && onLangChange(value); // ← 'ja' | 'en' | 'ko' 전달
  };

  return (
    <S.Wrapper>
      <S.TopBar>
        <div />
        <S.LangGroup>
          {LANGS.map(({ label, value }) => (
            <S.LangBtn
              key={value}
              type="button"
              aria-pressed={lang === value}
              $active={lang === value}
              onClick={() => selectLang(value)}
              title={`Switch to ${label}`}
            >
              {label}
            </S.LangBtn>
          ))}
        </S.LangGroup>
      </S.TopBar>

      <S.TitleArea>
        <S.TitleLine1>{t.title1}</S.TitleLine1>
        <S.TitleLine2>{t.title2}</S.TitleLine2>
      </S.TitleArea>

      <S.SearchBox role="search">
        <S.SearchInput
          value={query}
          onChange={handleInput}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchPlaceholder}
        />
        {query && (
          <S.ClearBtn onClick={handleClear} aria-label={t.clear}>
            ×
          </S.ClearBtn>
        )}
      </S.SearchBox>
    </S.Wrapper>
  );
}
