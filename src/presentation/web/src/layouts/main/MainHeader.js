import { useLocation, Link as routerLink } from 'react-router-dom';
import { useState } from 'react';

// @mui
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Autocomplete, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import products from '../../@fake-db/products.json';
// hooks

import useLocales from '../../hooks/useLocales';
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// components
import Logo from '../../components/Logo';

// paths
import { PATH_AUTH } from '../../routes/paths';

//
import LanguagePopover from './LanguagePopover';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import { FormProvider } from '../../components/hook-form';

// ----------------------------------------------------------------------
const userId = localStorage.getItem('userId');
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,

  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  // marginRight: '1em',
  // marginTop: '-2em',
  height: '100%',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
}));
const SearchIconWrapperMobile = styled('div')(({ theme }) => ({
  // marginLeft: '-180px',
  marginTop: '2em',
  marginBottom: '3em',
  height: '20px',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
}));

const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  marginTop: '-1em',
  marginRight: '.5em',
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      width: '5em',
    },
  },
}));
const StyledAutoCompleteMobile = styled(Autocomplete)(({ theme }) => ({
  color: 'inherit',
  padding: 0,
  '& .MuiInputBase-input': {
    padding: 0,
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '80%',
    height: '30px',
  },
}));
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
];
const StyledAutoCompleteRtl = styled(Autocomplete)(({ theme }) => ({
  color: 'inherit',
  marginTop: userId ? '-1.5em' : '.8em',
  marginRight: !userId ? '5em' : '3em',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '60%',
  },
  [theme.breakpoints.down('md')]: {
    marginRight: '3em',
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader(props) {
  const { translate } = useLocales();

  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);
  const user = true;
  const theme = useTheme();
  const isRTL = theme.direction === 'rtl';

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'md');
  const isDesktopDown = useResponsive('down', 'md');
  const isMobile = useResponsive('down', 'sm');
  const isMobileUp = useResponsive('up', 'sm');

  const isHome = pathname === '/';
  // ------------------ Searching  --------------------------------
  const [search, setSearch] = useState('');
  const handleSearchForm = (e) => {
    e.preventDefault();
  };

  const handleSelectedOption = (event, value) => {
    setSearch(value);
  };
  return (
    <>
      {theme.direction === 'rtl' ? (
        <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
          <ToolbarStyle
            disableGutters
            sx={{
              ...(isOffset && {
                ...cssStyles(theme).bgBlur(),
                height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
              }),
            }}
          >
            <Container
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {isDesktopDown && userId && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}

              {isMobile ? (
                
                <StyledAutoCompleteMobile
                  limitTags={11}
                  initial
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={products.map((option, i) => {
                    return option.name;
                  })}
                  renderOption={(props, option, index) => {
                    const key = `listItem-${props.id}-${props.key}`;
                    return (
                      <li {...props} key={key}>
                        {option}
                      </li>
                    );
                  }}
                  
                  onChange={handleSelectedOption}
                  
                  renderInput={(params) => (
                    <SearchIconWrapperMobile>
                      <TextField
                        variant="standard"
                        hiddenLabel
                        size="small"
                        placeholder="search..."
                        sx={{ width: (theme) => (isMobile ? '10rem' : '20rem'), padding: 0, fontSize: '.5em' }}
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </SearchIconWrapperMobile>
                  )}
                />
              ) : (
                <>
                  <AccountPopover />
                  <LanguagePopover />
                  <NotificationsPopover />
                  {!userId ? (
                    <>
                      {!isDesktopDown && (
                        <>
                          {!userId && (
                            <>
                              <Button variant="contained" component={routerLink} to={PATH_AUTH.registerComplete}>
                                {translate('register')}
                              </Button>
                              <Button
                                variant="contained"
                                component={routerLink}
                                to={PATH_AUTH.login}
                                sx={{
                                  marginRight: isDesktop ? '-1.5em' : '1.5em',
                                  marginLeft: isDesktop ? '-1.5em' : '1.5em',
                                }}
                              >
                                {translate('login')}
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </>
                  ) : null}
                </>
              )}

              {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}
              {/* <Box sx={{ flexGrow: 1 }} /> */}
              {/* Searching input field */}
              {isMobileUp ? (
                <FormProvider>
                  {/* ------------------------ */}
                  <Autocomplete
                    disablePortal
                    id="list"
                    options={top100Films}
                    sx={{ width: 500 }}
                    renderInput={(params) => <TextField {...params} label="Movie" />}
                  />

                  {/* ----------------------------- */}
                  <StyledAutoCompleteRtl
                    limitTags={11}
                    initial
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={products.map((option, i) => {
                      return option.name;
                    })}
                    renderOption={(props, option, index) => {
                      const key = `listItem-${props.id}-${props.key}`;
                      return (
                        <li {...props} key={key}>
                          {option}
                        </li>
                      );
                    }}
                    onChange={handleSelectedOption}
                    renderInput={(params) => (
                      <SearchIconWrapper>
                        <TextField
                          variant="standard"
                          hiddenLabel
                          size="small"
                          placeholder="search..."
                          sx={{ width: (theme) => (isMobile ? '10rem' : '12rem'), padding: 0, fontSize: '.5em' }}
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            startAdornment: (
                              <InputAdornment position="end">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </SearchIconWrapper>
                    )}
                  />
                </FormProvider>
              ) : null}

              <Logo sx={{ marginTop: !isDesktop ? '1em' : undefined }} />
            </Container>
          </ToolbarStyle>
          {isOffset && <ToolbarShadowStyle />}
        </AppBar>
      ) : (
        <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
          <ToolbarStyle
            disableGutters
            sx={{
              ...(isOffset && {
                ...cssStyles(theme).bgBlur(),
                height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
              }),
            }}
          >
            <Container
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Logo />
              <Box sx={{ flexGrow: 1 }} />
              {/* Searching input field */}
              <form action="#" onSubmit={handleSearchForm}>
                <StyledAutoComplete
                  limitTags={11}
                  initial
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  sx={{ width: isMobile ? '12em' : undefined, marginRight: isDesktop ? '2em' : undefined }}
                  options={products.map((option, i) => {
                    return option.name;
                  })}
                  renderOption={(props, option, index) => {
                    const key = `listItem-${props.id}-${props.key}`;
                    return (
                      <li {...props} key={key}>
                        {option}
                      </li>
                    );
                  }}
                  onChange={handleSelectedOption}
                  renderInput={(params) => (
                    <>
                      <SearchIconWrapper>
                        <TextField
                          hiddenLabel
                          variant="standard"
                          size="small"
                          placeholder="search..."
                          sx={{ width: (theme) => (theme.breakpoints.down('md') ? '15rem' : '20rem') }}
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            endAdornment: (
                              <InputAdornment position="end">
                                <SearchIcon edge="end" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </SearchIconWrapper>
                    </>
                  )}
                />
              </form>
              {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}

              {!isMobile && (
                <>
                  <LanguagePopover />
                  <NotificationsPopover />
                  {userId && <AccountPopover />}
                </>
              )}

              {!userId && (
                <>
                  {!isDesktopDown && (
                    <>
                      <Button
                        variant="contained"
                        component={routerLink}
                        to={PATH_AUTH.login}
                        sx={{ marginRight: isDesktop ? '1.5em' : '1em' }}
                      >
                        {translate('login')}
                      </Button>
                      <Button variant="contained" component={routerLink} to={PATH_AUTH.registerComplete}>
                        {translate('register')}
                      </Button>
                    </>
                  )}
                </>
              )}

              {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}
            </Container>
          </ToolbarStyle>
          {isOffset && <ToolbarShadowStyle />}
        </AppBar>
      )}
    </>
  );
}
