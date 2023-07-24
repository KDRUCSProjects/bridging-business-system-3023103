import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Tooltip, Badge, Box } from '@mui/material';
import { ShoppingCartRounded } from '@mui/icons-material';
import { PATH_AUTH } from '../../routes/paths';
import cssStyles from '../../utils/cssStyles';
import { IconButtonAnimate } from '../animate';

const RootStyle = styled('span')(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ opacity: 0.64 }),
  right: '0',
  top: '35%',
  position: 'fixed',
  marginTop: theme.spacing(-3),
  padding: theme.spacing(0.5),
  zIndex: theme.zIndex.drawer + 2,
  borderRadius: '50%',
  boxShadow: `-12px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.common.black,
    0.36
  )}`,
}));

const RootStyleRtl = styled('span')(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ opacity: 0.64 }),
  left: '0',
  top: '35%',
  position: 'fixed',
  marginTop: theme.spacing(-3),
  padding: theme.spacing(0.5),
  zIndex: theme.zIndex.drawer + 2,
  borderRadius: '50%',
  boxShadow: `-12px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.common.black,
    0.36
  )}`,
}));
export default function Cart() {
  const CartCount = useSelector((store) => store.checkout.checkout.cart);
  const theme = useTheme();
  const isRTL = theme.direction === 'rtl';

  return (
    <>
      {theme.direction === 'rtl' ? (
        <RootStyleRtl>
          <Tooltip title="Add To Cart" placement="left">
            <IconButtonAnimate
              color="inherit"
              sx={{
                p: 1.25,
                transition: (theme) => theme.transitions.create('all'),
                '&:hover': {
                  color: 'secondary.main',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
                },
              }}
            >
              <Badge
                badgeContent={`${CartCount.length}`}
                anchorOrigin={{ color: 'error.main', vertical: 'top', horizontal: 'left' }}
              >
                <Box sx={{ padding: '3px' }} component={Link} to={PATH_AUTH.checkOut}>
                  <ShoppingCartRounded sx={{ color: 'primary.main' }} />
                </Box>
              </Badge>
            </IconButtonAnimate>
          </Tooltip>
        </RootStyleRtl>
      ) : (
        <RootStyle>
          <Tooltip title="Add To Cart" placement="left">
            <IconButtonAnimate
              color="inherit"
              sx={{
                p: 1.25,
                transition: (theme) => theme.transitions.create('all'),
                '&:hover': {
                  color: 'secondary.main',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
                },
              }}
            >
              <Badge
                badgeContent={`${CartCount.length}`}
                anchorOrigin={{ color: 'error.main', vertical: 'top', horizontal: 'left' }}
              >
                <Box sx={{ padding: '3px' }} component={Link} to={PATH_AUTH.checkOut}>
                  <ShoppingCartRounded sx={{ color: 'primary.main' }} />
                </Box>
              </Badge>
            </IconButtonAnimate>
          </Tooltip>
        </RootStyle>
      )}
    </>
  );
}
