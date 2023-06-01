// redux Provider
import { Provider } from 'react-redux';

// components
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import ThemeSettings from './components/settings';
import Router from './routes';
import './locale/i18n';

// store
import store from './store/store';

// theme
import ThemeProvider from './theme';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <Provider store={store}>
      <MotionLazyContainer>
        <ThemeProvider>
          <ThemeSettings>
            <NotistackProvider>
              <ProgressBarStyle />
              <ScrollToTop />
              <Router />
            </NotistackProvider>
          </ThemeSettings>
        </ThemeProvider>
      </MotionLazyContainer>
    </Provider>
  );
}
