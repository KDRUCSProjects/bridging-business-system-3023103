// @mui
import { Container } from '@mui/material';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import InvoiceNewEditForm from '../../sections/invoice/new-edit-form';

// ----------------------------------------------------------------------

export default function InvoiceCreate() {


  return (
    <Page title="Create a new invoice">
      <Container sx={{marginTop: "5rem" , marginBottom: "2rem"}}>
        <HeaderBreadcrumbs
          heading="Create a new order"
          links={[
            { name: 'order page'},
          ]}
        />
        <InvoiceNewEditForm />
      </Container>
    </Page>
  );
}
