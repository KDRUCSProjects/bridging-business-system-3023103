import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem, IconButton, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency, fData } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
//
import { addCart } from '../../../../store/slices/checkout/checkout';

// ----------------------------------------------------------------------

ProductTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ProductTableRow({ row, index, selected }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleAddCart = async () => {
    dispatch(addCart(row));
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {index + 1}
        </Typography>
      </TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Button component={Link} to={`/product/details/${row.id}/`}>
          <Image
            disabledEffect
            alt={row.name}
            src={row.images[0]?.image}
            sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
          />
        </Button>

        <Typography variant="subtitle2" noWrap>
          {row.name}
        </Typography>
      </TableCell>

      <TableCell>{fDate(row.created_at)}</TableCell>
      <TableCell align="center">
        <IconButton color="primary" aria-label="add to shopping cart" onClick={handleAddCart}>
          <AddShoppingCartIcon />
        </IconButton>
      </TableCell>
      <TableCell align="right">{row.quantity}</TableCell>
      <TableCell align="right">{fCurrency(row.price)}</TableCell>
    </TableRow>
  );
}
