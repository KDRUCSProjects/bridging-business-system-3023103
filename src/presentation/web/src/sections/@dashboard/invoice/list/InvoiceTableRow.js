import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import createAvatar from '../../../../utils/createAvatar';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Avatar from '../../../../components/Avatar';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';

// ----------------------------------------------------------------------

InvoiceTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function InvoiceTableRow({ row, index, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Typography>{index + 1}</Typography>
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Stack>
          <Link noWrap variant="body2" onClick={onViewRow} sx={{ color: 'text.disabled', cursor: 'pointer' }}>
            {`ORDER-${row.id}`}
          </Link>
        </Stack>
      </TableCell>

      <TableCell align="left">{fDate(row.create_at)}</TableCell>

      <TableCell align="left">{row.total}</TableCell>

      <TableCell align="center">{fCurrency(row.order_details.length)}</TableCell>

      <TableCell align="right">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(row.is_visited === 'is_visited' && 'success') || 'default'}
          sx={{ textTransform: 'capitalize' }}
        >
          {row.is_visited}
        </Label>
      </TableCell>
    </TableRow>
  );
}
