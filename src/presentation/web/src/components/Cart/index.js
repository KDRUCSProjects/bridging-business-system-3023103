import { alpha, styled } from '@mui/material/styles';
import { Tooltip } from '@mui/material';
import { ShoppingCartRounded } from '@mui/icons-material';
import cssStyles from '../../utils/cssStyles';
import { IconButtonAnimate } from '../animate';

const RootStyle = styled('span')(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ opacity: 0.64 }),
  right: 0,
  top: '35%',
  position: 'fixed',
  marginTop: theme.spacing(-3),
  padding: theme.spacing(0.5),
  zIndex: theme.zIndex.drawer + 2,
  borderRadius: '24px 0 20px 24px',
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
              color: 'primary.main',
              bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
            },
          }}
        >
          <ShoppingCartRounded />
        </IconButtonAnimate>
      </Tooltip>
    </RootStyle>
  );
};

export default Cart;
