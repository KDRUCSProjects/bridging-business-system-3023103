import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment,
} from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
// components
import Iconify from '../../components/Iconify';

import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

CheckoutSummary.propTypes = {
  total: PropTypes.number,
  subtotal: PropTypes.number,
  onEdit: PropTypes.func,
};

export default function CheckoutSummary({ total, onEdit }) {
  const { translate } = useLocales();

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title={translate('Order Summary')} />

      <CardContent>
        <Stack spacing={2}>
          <Divider sx={{ marginBottom: '2em' }} />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">{translate('Total')}</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1">
                <span style={{ color: 'red', fontSize: '1.5em' }}>&#1547;</span>
                {`(${fCurrency(total)})`}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
