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
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  onEdit: PropTypes.func,
  enableEdit: PropTypes.bool,
  onApplyDiscount: PropTypes.func,
  enableDiscount: PropTypes.bool,
};

export default function CheckoutSummary({
  total,
  onEdit,
  discount,
  subtotal,
  shipping,
  onApplyDiscount,
  enableEdit = false,
  enableDiscount = false,
}) {
  const displayShipping = shipping !== null ? 'Free' : '-';
  const { translate } = useLocales();

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={translate('Order Summary')}
        action={
          enableEdit && (
            <Button size="small" onClick={onEdit} startIcon={<Iconify icon={'eva:edit-fill'} />}>
              Edit
            </Button>
          )
        }
      />

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
