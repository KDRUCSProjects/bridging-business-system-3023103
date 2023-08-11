import { useState, useEffect } from 'react';
import _ from 'lodash';

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
  Button,
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
  { id: 'company', label: 'Companies' },
  { id: 'Proudct-Count', label: 'Product-counts' },
  {
    id: `Let's Buy`,
    label: `Let's Buy`,
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

const list = [
  {
    id: 10,
    productRatting: [
      { id: 23, ratting_stars: 5, user: 8, product: 10 },
      { id: 24, ratting_stars: 3, user: 8, product: 10 },
      { id: 25, ratting_stars: 3, user: 8, product: 10 },
      { id: 26, ratting_stars: 3, user: 8, product: 10 },
      { id: 27, ratting_stars: 3, user: 8, product: 10 },
      { id: 30, ratting_stars: 5, user: 8, product: 10 },
    ],
    ratting: 3.6666666666666665,
    available_quantity: 1,
    images: [{ id: 12, image: 'http://localhost:8000/images/cars_x63HS0w.webp', product: 10 }],
    counter: 1,
    name: 'buggati car',
    description: '<p>asdfasdfasdf</p>',
    quantity: 1,
    price: 1000000,
    created_at: '2023-07-24T07:17:28.784171Z',
    updated_at: '2023-07-24T07:17:28.784212Z',
    is_sold: false,
    user: 8,
    category: 13,
    color: [
      { id: 1, name: 'red' },
      { id: 2, name: 'black' },
    ],
  },
  {
    id: 10,
    productRatting: [
      { id: 23, ratting_stars: 5, user: 8, product: 10 },
      { id: 24, ratting_stars: 3, user: 8, product: 10 },
      { id: 25, ratting_stars: 3, user: 8, product: 10 },
      { id: 26, ratting_stars: 3, user: 8, product: 10 },
      { id: 27, ratting_stars: 3, user: 8, product: 10 },
      { id: 30, ratting_stars: 5, user: 8, product: 10 },
    ],
    ratting: 3.6666666666666665,
    available_quantity: 1,
    images: [{ id: 12, image: 'http://localhost:8000/images/cars_x63HS0w.webp', product: 10 }],
    counter: 1,
    name: 'buggati car',
    description: '<p>asdfasdfasdf</p>',
    quantity: 1,
    price: 1000000,
    created_at: '2023-07-24T07:17:28.784171Z',
    updated_at: '2023-07-24T07:17:28.784212Z',
    is_sold: false,
    user: 9,
    category: 13,
    color: [
      { id: 1, name: 'red' },
      { id: 2, name: 'black' },
    ],
  },
  {
    id: 10,
    productRatting: [
      { id: 23, ratting_stars: 5, user: 8, product: 10 },
      { id: 24, ratting_stars: 3, user: 8, product: 10 },
      { id: 25, ratting_stars: 3, user: 8, product: 10 },
      { id: 26, ratting_stars: 3, user: 8, product: 10 },
      { id: 27, ratting_stars: 3, user: 8, product: 10 },
      { id: 30, ratting_stars: 5, user: 8, product: 10 },
    ],
    ratting: 3.6666666666666665,
    available_quantity: 1,
    images: [{ id: 12, image: 'http://localhost:8000/images/cars_x63HS0w.webp', product: 10 }],
    counter: 1,
    name: 'buggati car',
    description: '<p>asdfasdfasdf</p>',
    quantity: 1,
    price: 1000000,
    created_at: '2023-07-24T07:17:28.784171Z',
    updated_at: '2023-07-24T07:17:28.784212Z',
    is_sold: false,
    user: 9,
    category: 13,
    color: [
      { id: 1, name: 'red' },
      { id: 2, name: 'black' },
    ],
  },
  {
    id: 10,
    productRatting: [
      { id: 23, ratting_stars: 5, user: 8, product: 10 },
      { id: 24, ratting_stars: 3, user: 8, product: 10 },
      { id: 25, ratting_stars: 3, user: 8, product: 10 },
      { id: 26, ratting_stars: 3, user: 8, product: 10 },
      { id: 27, ratting_stars: 3, user: 8, product: 10 },
      { id: 30, ratting_stars: 5, user: 8, product: 10 },
    ],
    ratting: 3.6666666666666665,
    available_quantity: 1,
    images: [{ id: 12, image: 'http://localhost:8000/images/cars_x63HS0w.webp', product: 10 }],
    counter: 1,
    name: 'buggati car',
    description: '<p>asdfasdfasdf</p>',
    quantity: 1,
    price: 1000000,
    created_at: '2023-07-24T07:17:28.784171Z',
    updated_at: '2023-07-24T07:17:28.784212Z',
    is_sold: false,
    user: 10,
    category: 13,
    color: [
      { id: 1, name: 'red' },
      { id: 2, name: 'black' },
    ],
  },

  {
    id: 11,
    productRatting: [{ id: 32, ratting_stars: 5, user: 8, product: 11 }],
    ratting: 5,
    available_quantity: 2,
    images: [
      { id: 13, image: 'http://localhost:8000/images/highheels_d246VaZ.webp', product: 11 },
      { id: 14, image: 'http://localhost:8000/images/5IpvViJVl1-s895x715-q90.jpg', product: 11 },
    ],
    counter: 1,
    name: 'highHeals',
    description: '<p>sadfasdfa</p>',
    quantity: 2,
    price: 200,
    created_at: '2023-07-24T13:57:14.754423Z',
    updated_at: '2023-07-24T13:57:14.754657Z',
    is_sold: false,
    user: 8,
    category: 5,
    color: [
      { id: 1, name: 'red' },
      { id: 3, name: 'yellow' },
    ],
  },
  {
    id: 9,
    productRatting: [
      { id: 17, ratting_stars: 4, user: 8, product: 9 },
      { id: 18, ratting_stars: 5, user: 8, product: 9 },
      { id: 19, ratting_stars: 3, user: 8, product: 9 },
      { id: 20, ratting_stars: 3, user: 8, product: 9 },
      { id: 21, ratting_stars: 5, user: 8, product: 9 },
      { id: 22, ratting_stars: 5, user: 8, product: 9 },
      { id: 28, ratting_stars: 4, user: 8, product: 9 },
      { id: 29, ratting_stars: 5, user: 8, product: 9 },
    ],
    ratting: 4.25,
    available_quantity: 12,
    images: [{ id: 11, image: 'http://localhost:8000/images/mobiles_kYa9kRO.jpg', product: 9 }],
    counter: 1,
    name: 'S 10 altra pro max Samsong',
    description: '<p>ijkjlkjljlkjlkj</p>',
    quantity: 12,
    price: 12000,
    created_at: '2023-07-24T06:35:22.730146Z',
    updated_at: '2023-07-24T06:35:22.730163Z',
    is_sold: false,
    user: 8,
    category: 2,
    color: [{ id: 1, name: 'red' }],
  },
];

function CheckoutProductListRow({ row, onDelete, handleQuantity, productId }) {
  const listedProducts = _.groupBy(list, 'user');

  Object.keys(listedProducts).forEach((element) => {
    console.log('this', new Set(element));
  });

  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Image alt="product image" src={images[0].image} sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }} /> */}

        <Stack spacing={0.5}>
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
            {/* {user} */}
            helo
          </Typography>
        </Stack>
      </TableCell>

      {/* <TableCell>{fCurrency(price)}</TableCell> */}

      <TableCell align="right">
        <Button variant="contained" size="large" width="100%">
          Buy
        </Button>
      </TableCell>

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
