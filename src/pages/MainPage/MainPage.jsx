import { useState } from 'react';

import Header from '../../components/Header/Header';
import CardSlider from '../../components/CardSlider/CardSlider';
import ThemeSelector from '../../components/ThemeSelector/ThemeSelector';

const MainPage = ({ currentTheme, onThemeChange }) => {
  // eslint-disable-next-line no-unused-vars
  const [keyword, setKeyword] = useState('');
  const [lang, setLang] = useState('ja'); // 'ja' | 'en' | 'ko'
  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);

  return (
    <>
      <ThemeSelector currentTheme={currentTheme} onChange={onThemeChange} />
      <Header onSearch={setKeyword} onLangChange={setLang} />
      <div style={{ padding: '0 2rem' }}>
        <CardSlider
          autoPlay
          speed={isMobile ? 28 : 20} // 모바일 가속
          dragScale={0.5}
          dragThreshold={12}
          wheelFactor={0.7}
          lang={lang}
        />
      </div>
    </>
  );
};

export default MainPage;
