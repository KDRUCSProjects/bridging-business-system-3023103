import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
  TextField,
  Grid,
} from '@mui/material';

// store
import { useDispatch } from 'react-redux';

// utils
import getColorName from '../../utils/getColorName';
import { fCurrency } from '../../utils/formatNumber';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { TableHeadCustom } from '../../components/table';
import { ColorPreview } from '../../components/color-utils';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'product', label: 'Product' },
  { id: 'price', label: 'Price' },
  { id: 'quantity', label: 'Quantity' },
  {
    id: 'totalPrice',
    label: `Total Price`,
    align: 'right',
  },
  { id: '' },
];

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
}));

// ----------------------------------------------------------------------

CheckoutProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function CheckoutProductList({ quantity, products, onDelete, handleQuantity }) {
  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHeadCustom headLabel={TABLE_HEAD} />

        <TableBody>
          {products.map((row) => (
            <CheckoutProductListRow
              key={row.id}
              row={row}
              productId={row.id}
              handleQuantity={handleQuantity}
              onDelete={() => onDelete(row.id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
// ----------------------------------------------------------------------

CheckoutProductListRow.propTypes = {
  onDecrease: PropTypes.func,
  onDelete: PropTypes.func,
  onIncrease: PropTypes.func,
  row: PropTypes.shape({
    available: PropTypes.number,
    color: PropTypes.string,
    cover: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    size: PropTypes.string,
  }),
};

function CheckoutProductListRow({ row, onDelete, handleQuantity, productId }) {
  const { name, price, color, images, quantity, available_quantity: available } = row;
  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Image alt="product image" src={images[0].image} sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }} />

        <Stack spacing={0.5}>
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
            {name}
          </Typography>

          <Stack direction="row" alignItems="center">
            <Typography variant="body2">
              <Box component="span" sx={{ color: 'text.secondary' }}>
                color:&nbsp;
              </Box>
              <ColorPreview colors={color} />
            </Typography>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>{fCurrency(price)}</TableCell>

      <TableCell>
        <Incrementer available={available} quantity={quantity} productId={productId} handleQuantity={handleQuantity} />
      </TableCell>

      <TableCell align="right">{fCurrency(price * quantity)}</TableCell>

      <TableCell align="right">
        <IconButton onClick={onDelete}>
          <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
};

function Incrementer({ available, productId, handleQuantity }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [message, setMessage] = useState(false);

  const handleDirectQuantityfun = async () => {
    if (product >= available) {
      setProduct(available);
      setMessage(true);
    }
    setMessage(false);
    await dispatch(handleQuantity({ productId, product }));
  };

  useEffect(() => {
    handleDirectQuantityfun();
  }, [product]);

  return (
    <Box sx={{ width: 396, textAlign: 'left' }}>
      <Grid conatiner>
        <Grid item>
          <TextField
            sx={{ width: '100px' }}
            type="number"
            placeholder="value"
            value={product}
            size={'small'}
            onChange={(e) => setProduct(e.target.value)}
            helperText={message ? 'Count You Mentioned not Avaliable' : null}
          />
        </Grid>
        <Grid item>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            available: {available}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
