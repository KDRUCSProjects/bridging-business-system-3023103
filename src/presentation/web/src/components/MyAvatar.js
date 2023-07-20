import { useTheme } from '@mui/material/styles';
// ----------------------------------------------------------------------
import Avatar from './Avatar';

export default function MyAvatar({myphoto , ...other  }) {
  const theme = useTheme();

  return (
    <Avatar
      src={myphoto}
      alt={'avatar'}
      color={theme.palette.primary.main}
      {...other}
    />
  );
}
