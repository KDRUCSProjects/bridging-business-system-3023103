import PropTypes from 'prop-types';
// @mui
import { List, Box } from '@mui/material';
import {useTheme} from '@mui/material/styles'
// hooks
import useLocales from '../../../hooks/useLocales';
//
import { ListSubheaderStyle } from './style';
import NavList from './NavList';

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSectionVertical({ navConfig, isCollapse, ...other }) {
  const theme  =  useTheme();
  const { translate } = useLocales();
  return (
    <Box {...other}>
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              borderLeft: `2px solid ${theme.palette.secondary.main}`,
              marginBottom:".5rem",
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
      ))}
    </Box>
  );
}
