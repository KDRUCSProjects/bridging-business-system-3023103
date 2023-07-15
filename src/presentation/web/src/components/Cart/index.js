import { Link } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Tooltip, Badge, Box } from '@mui/material';
import { ShoppingCartRounded } from '@mui/icons-material';
import { PATH_AUTH } from '../../routes/paths';
import cssStyles from '../../utils/cssStyles';
import { IconButtonAnimate } from '../animate';

const RootStyle = styled('span')(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ opacity: 0.64 }),
  right: '1%',
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

const Cart = () => {
  return (
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
          <Badge badgeContent="30" anchorOrigin={{ color: 'error.main', vertical: 'top', horizontal: 'left' }}>
            <Box sx={{ padding: '3px' }} component={Link} to={PATH_AUTH.checkOut}>
              <ShoppingCartRounded sx={{ color: 'primary.main' }} />
            </Box>
          </Badge>
        </IconButtonAnimate>
      </Tooltip>
    </RootStyle>
  );
};

export default Cart;
