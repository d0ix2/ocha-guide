import { useState } from 'react';
import Header from '../../components/Header/Header';
import CardSlider from '../../components/CardSilder/CardSlider';
import ThemeSelector from '../../components/ThemeSelector/ThemeSelector';

const MainPage = ({ currentTheme, onThemeChange }) => {
  const [keyword, setKeyword] = useState('');
  const [lang, setLang] = useState('ja'); // 'ja' | 'en' | 'ko'

  return (
    <>
      <ThemeSelector currentTheme={currentTheme} onChange={onThemeChange} />
      <Header onSearch={setKeyword} onLangChange={setLang} />
      <div style={{ padding: '0 2rem' }}>
        <CardSlider
          autoPlay
          speed={20}
          dragScale={0.5} // 더 덜 움직이게
          dragThreshold={12} // 살짝 움직여도 클릭으로 인식
          wheelFactor={0.7}
          lang={lang}
        />
      </div>
    </>
  );
};

export default MainPage;
