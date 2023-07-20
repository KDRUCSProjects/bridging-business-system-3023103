import React from 'react';
// @mui
import { Container } from '@mui/material';

// components
import Page from '../../components/Page';
import AdProductForm from './AdProductForm';
import useSettings from '../../hooks/useSettings';

// ----------------------------------------------------------------------
console.log("")
export default function AdProduct() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Ecommerce: Create a new product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <AdProductForm />
      </Container>
    </Page>
  );
}
