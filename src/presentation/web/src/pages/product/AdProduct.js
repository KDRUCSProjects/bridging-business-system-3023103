// @mui
import { Container } from '@mui/material';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import AdProductForm from './AdProductForm';
import useSettings from '../../hooks/useSettings';

// ----------------------------------------------------------------------

export default function AdProduct() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Ecommerce: Create a new product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Create a new product" links={[{ name: 'Home' }]} />
        <AdProductForm />
      </Container>
    </Page>
  );
}
