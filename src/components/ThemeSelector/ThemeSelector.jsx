import React, { useState } from 'react';
import * as S from './ThemeSelector.style';

import { FiDroplet } from 'react-icons/fi';

const ThemeSelector = ({ currentTheme, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = ['light', 'dark'];

  return (
    <S.ThemeSelectorWrapper>
      <S.ToggleButton themeColor={currentTheme} onClick={() => setIsOpen(!isOpen)}>
        <FiDroplet size={20} />
      </S.ToggleButton>
      {isOpen && (
        <S.Dropdown>
          {theme.map((theme) => (
            <S.Option
              key={theme}
              onClick={(e) => {
                onChange({ target: { value: theme } });
                setIsOpen(false);
              }}
              style={{
                fontWeight: currentTheme === theme ? 'bold' : 'normal',
              }}
            >
              {theme === 'light' && '라이트'}
              {theme === 'dark' && '다크'}
            </S.Option>
          ))}
        </S.Dropdown>
      )}
    </S.ThemeSelectorWrapper>
  );
};

export default ThemeSelector;
