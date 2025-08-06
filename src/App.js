// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import theme from './styles/theme';

import MainPage from './pages/MainPage/MainPage';
import DetailPage from './pages/DetailPage/DetailPage';
import ServiceInfoPage from './pages/ServiceInfoPage/ServiceInfoPage';

function App() {
  const [currentTheme, setCurrentTheme] = useState('light');

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                currentTheme={currentTheme}
                onThemeChange={(e) => setCurrentTheme(e.target.value)}
              />
            }
          />
          <Route path="/guide/:id" element={<DetailPage />} />
          <Route path="/service-info" element={<ServiceInfoPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
