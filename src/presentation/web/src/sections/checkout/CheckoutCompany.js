import { useEffect, useState } from 'react';
import sum from 'lodash/sum';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Card,
  CardHeader,
  Typography,
  TableRow,
  Box,
  Stack,
  Table,
  TableCell,
  TableContainer,
  Grid,
  Button,
  TableBody,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../store/store';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import EmptyContent from '../../components/EmptyContent';
import Image from '../../components/Image';
import { TableHeadCustom } from '../../components/table';
//

import useLocales from '../../hooks/useLocales';
import { CompanyList } from '.';
import BaseApi from '../../store/BaseApi';

// ----------------------------------------------------------------------

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

const TABLE_HEAD = [
  { id: 'company', label: 'Companies' },
  {
    id: `Let's Buy`,
    label: `Let's Buy`,
    align: 'right',
  },
];

export default function CheckoutCompany(activeStep) {
  const dispatch = useDispatch();
  const [SelectedCompany, setSelectedCompany] = useState([]);

  const { data: Users, isSuccess, isLoading, isError } = BaseApi.useGetBusinessProfileQuery('/api/business_profile/');

  const { checkout } = useSelector((store) => store.checkout);

  const { cart } = checkout;

  const listedProducts = _.groupBy(cart, 'user');

  const isEmptyCart = SelectedCompany.length === 0;
  const { translate } = useLocales();

  if (isSuccess) {
  
  }
  useEffect(()=>{
    setSelectedCompany([]);
    let res;
    Object.keys(listedProducts).map((key) => {
      res = Users.results.filter((existedUser) => {
        return existedUser.user === Number(key);
      });
      SelectedCompany.push(...res);
    });
    console.log('Selected  Company ', SelectedCompany);
  },[isSuccess])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                {translate('Company')}
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({Object.keys(listedProducts).length} {translate('companies')})
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {SelectedCompany ? (
            <Scrollbar>
              <TableContainer sx={{ minWidth: 720 }}>
                <Table>
                  <TableHeadCustom headLabel={TABLE_HEAD} />

                  <TableBody>
                    {
                      SelectedCompany.map((element, index) => {
                        return (
                          <TableRow key={index + element.id}>
                            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                              <Image
                                alt="product image"
                                src={element.avator}
                                sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
                              />

                              <Stack spacing={0.5}>
                                <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                                  {element.businessName}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="right">
                              <Button variant="contained" size="large" width="100%">
                                Buy
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          ) : (
            <EmptyContent
              title={translate('No Company !')}
              description={translate('Look like you have No Company  in your shopping cart.')}
            />
          )}
        </Card>
        <Button
          color="inherit"
          component={RouterLink}
          to={'Home'}
          startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
        >
          {translate('Continue Shopping')}
        </Button>
      </Grid>
    </Grid>
  );
}
