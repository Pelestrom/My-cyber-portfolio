import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import '@fontsource/instrument-sans/latin-400.css';import '@fontsource/instrument-sans/latin-500.css';import '@fontsource/syne/latin-700.css';import '@fontsource/jetbrains-mono/latin-400.css';
import { LocaleProvider } from './lib/Locale';
import App from './App';
import { ThemeProvider } from './lib/Theme';
import './styles/global.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><MotionConfig reducedMotion="user"><ThemeProvider><LocaleProvider><App/></LocaleProvider></ThemeProvider></MotionConfig></React.StrictMode>);
