import PropTypes from 'prop-types';
import { Link as routerLink } from 'react-router-dom';
// @mui
import { List, Box, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// hooks
import useLocales from '../../../hooks/useLocales';
//
import { ListSubheaderStyle } from './style';
import NavList from './NavList';
import { PATH_AUTH } from '../../../routes/paths';
import AccountPopover from '../../../layouts/main/AccountPopover';
import LanguagePopover from '../../../layouts/main/LanguagePopover';
import NotificationsPopover from '../../../layouts/main/NotificationsPopover';

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSectionVertical({ navConfig, isCollapse, ...other }) {
  const theme = useTheme();
  const { translate } = useLocales();
  return (
    <Box {...other}>
      {navConfig.map((group, index) => (
        <>
          <List key={group.subheader + index} disablePadding sx={{ px: 2 }}>
            <ListSubheaderStyle
              sx={{
                borderLeft: `2px solid ${theme.palette.secondary.main}`,
                marginBottom: '.5rem',
                ...(isCollapse && {
                  opacity: 0,
                }),
              }}
            >
              {translate(group.subheader)}
            </ListSubheaderStyle>
            {group.items.map((list) => (
              <NavList
                key={list.title + list.path}
                data={list}
                depth={1}
                hasChildren={!!list.children}
                isCollapse={isCollapse}
              />
            ))}
          </List>
        </>
      ))}
    </Box>
  );
}
