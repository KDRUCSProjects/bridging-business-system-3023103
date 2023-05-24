import { useTheme } from '@mui/material/styles';
// ----------------------------------------------------------------------
import Avatar from './Avatar';

export default function MyAvatar({ ...other }) {
  const theme = useTheme();

  return (
    <Avatar
      src={'https://minimal-assets-api-dev.vercel.app/assets/images/rooms/room-1.jpg'}
      alt={'avatar'}
      color={theme.palette.primary.main}
      {...other}
    />
  );
}
