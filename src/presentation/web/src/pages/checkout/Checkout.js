// @mui
import { Grid, Container } from '@mui/material';

// components
import Page from '../../components/Page';

export default function Checkout() {
  const isComplete = false;

  return (
    <Page title="Ecommerce: Checkout">
      {/* maxWidth={themeStretch ? false : 'lg'} */}
      <Container>
        <Grid container justifyContent={isComplete ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            Steps
          </Grid>
        </Grid>
        Components
      </Container>
    </Page>
  );
}
