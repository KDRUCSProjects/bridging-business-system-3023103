import React from 'react';
// @mui
import { Container } from '@mui/material';

// components
import { useParams } from 'react-router';
import Page from '../../components/Page';
import AdProductForm from './AdProductForm';
import useSettings from '../../hooks/useSettings';
import BaseApi from '../../store/BaseApi';
// ----------------------------------------------------------------------

export default function AdProduct() {
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const { data: colors, isSuccess: colorSuccess } = BaseApi.useGetAllColorsQuery('api/product_color/');
  const { data, isSuccess } = BaseApi.useGetSpecificProductQuery(`api/product/${id}`);
  const idEdit = true;

  return (
    <Page title="Ecommerce: Create a new product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {id && isSuccess && colorSuccess ? (
          <AdProductForm currentProduct={data} isEdit={idEdit} colors={colors} />
        ) : (
          <AdProductForm colors={colors} />
        )}
      </Container>
    </Page>
  );
}
