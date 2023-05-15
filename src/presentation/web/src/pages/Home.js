// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';


// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="Ecommerce Start Here">

      <ContentStyle>
        Home Page
      </ContentStyle>
    </Page>
  );
}
