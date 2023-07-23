import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { NavLink as RouterLink, Link as routerLink, useLocation } from 'react-router-dom';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import {
  Box,
  List,
  Link,
  Drawer,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Grid,
  Button,
} from '@mui/material';
// config
import { NAVBAR } from '../../config';
// components
import Logo from '../../components/Logo';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { IconButtonAnimate } from '../../components/animate';
import { NavSectionVertical } from '../../components/nav-section';
import navConfig from './MenuConfig';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import { PATH_AUTH } from '../../routes/paths';
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  textTransform: 'capitalize',
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------
const userId = localStorage.getItem('userId');

MenuMobile.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool,
  navConfig: PropTypes.func,
};

export default function MenuMobile({ isOffset, isHome }) {
  const { pathname } = useLocation();
  const { translate } = useLocales();

  const [open, setOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
  }, [pathname]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: 'common.white' }),
          ...(isOffset && { color: 'text.primary' }),
        }}
      >
        <Iconify icon={'eva:menu-2-fill'} />
      </IconButtonAnimate>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Grid
          container
          flexDirection="row"
          justifyContent={'center'}
          spacing={3}
          alignItems="baseline"
          sx={{ position: 'absolute', left: '1em', top: '8em', mb: 3 }}
        >
          <Grid item ml={-4}>
            <AccountPopover />
          </Grid>
          <Grid item>
            <LanguagePopover />
          </Grid>
          <Grid item>
            <NotificationsPopover />
          </Grid>
        </Grid>
        <Scrollbar sx={{ marginTop: '2em' }}>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List disablePadding>
            {navConfig().map((link) => (
              <MenuMobileItem key={link.title} item={link} isOpen={open} onOpen={handleOpen} />
            ))}
          </List>
          {!userId && (
            <List>
              <Button
                sx={{ marginRight: '1.5em', marginLeft: '1.5em' }}
                variant="contained"
                component={routerLink}
                to={PATH_AUTH.registerComplete}
              >
                {translate('register')}
              </Button>
              <Button
                variant="contained"
                component={routerLink}
                to={PATH_AUTH.login}
                sx={{
                  marginRight: '1.5em',
                  marginLeft: '1.5em',
                }}
              >
                {translate('login')}
              </Button>
            </List>
          )}
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

MenuMobileItem.propTypes = {
  isOpen: PropTypes.bool,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
  onOpen: PropTypes.func,
};

function MenuMobileItem({ item, isOpen, onOpen }) {
  const { title, path, icon, children } = item;
  const theme = useTheme();

  if (children) {
    return (
      <>
        <ListItemStyle onClick={onOpen}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          <Iconify
            icon={isOpen ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>
        <Collapse in={isOpen} unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <NavSectionVertical
              navConfig={children}
              sx={{
                '& .MuiList-root:last-of-type .MuiListItemButton-root': {
                  borderLeft: `2px solid ${theme.palette.primary.main}`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  bgcolor: 'background.neutral',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: 'url(/assets/illustrations/illustration_dashboard.png)',
                  '& > *:not(.MuiTouchRipple-root)': { display: 'none' },
                },
              }}
            />
          </Box>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      to={path}
      component={RouterLink}
      end={path === '/'}
      sx={{
        '&.active': {
          color: 'primary.main',
          fontWeight: 'fontWeightMedium',
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText disableTypography primary={title} />
    </ListItemStyle>
  );
}
