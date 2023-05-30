// @mui
import { faIR, ptPT, enUS } from '@mui/material/locale';

// Icons
import USA from './assets/flags/usaFlag.svg';
import AFG from './assets/flags/afgFlag.svg';

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const MAPBOX_API = process.env.REACT_APP_MAPBOX_API;

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const defaultSettings = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeContrast: 'default',
  themeLayout: 'horizontal',
  themeColorPresets: 'default',
  themeStretch: false,
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'Pashto',
    value: 'ps',
    systemValue: ptPT,
    icon: AFG,
  },
  {
    label: 'Dari',
    value: 'fa',
    systemValue: faIR,
    icon: AFG,
  },
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: USA,
  },
];

export const defaultLang = allLangs[2]; // Pashto
