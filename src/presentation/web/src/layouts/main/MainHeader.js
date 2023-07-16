import { useLocation, Link as routerLink } from 'react-router-dom';
import { useState } from 'react';
// @mui
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

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
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';

// ----------------------------------------------------------------------
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
  padding: theme.spacing(0, 2),
  marginRight: '1em',
  height: '100%',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
}));

const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
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

  const theme = useTheme();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/';
  // ------------------ Searching  --------------------------------
  const [search, setSearch] = useState('');
  const handleSearchForm = (e) => {
    e.preventDefault();
  };

  const handleSelectedOption = (event, value) => {
    setSearch(value);
  };
  console.log(search);
  return (
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
                      sx={{ width: (theme) => (theme.breakpoints.down('md') ? '15rem' : '20rem') }}
                      {...params}
                      label={translate('Search')}
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                    <SearchIcon sx={{ marginLeft: -5 }} />
                  </SearchIconWrapper>
                </>
              )}
            />
          </form>

          {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}
          <LanguagePopover />
          <Button
            variant="contained"
            component={routerLink}
            to={PATH_AUTH.login}
            sx={{ marginRight: isDesktop ? '1.5em' : '.5em' }}
          >
            {translate('login')}
          </Button>
          <Button variant="contained" component={routerLink} to={PATH_AUTH.register}>
            {translate('register')}
          </Button>

          {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
