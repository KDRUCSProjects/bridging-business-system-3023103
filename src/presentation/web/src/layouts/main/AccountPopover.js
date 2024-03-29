import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// import { AUTH } from '../../Apgit/routes/path';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import MyAvatar from '../../components/MyAvatar';
import MenuPopover from '../../components/MenuPopover';
import { IconButtonAnimate } from '../../components/animate';

import BaseApi from '../../store/BaseApi';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [LogoutUser] = BaseApi.useLogoutUserMutation();
  const userEmail1 = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');
  const { data, isError, isSuccess, isLoading } = BaseApi.useGetSpecificUserQuery(
    `api/business_profile/?user=${userId}`
  );

  const handleReload = () => {
    console.log('clicked');
    window.location.reload();
  };

  const MENU_OPTIONS = [
    {
      label: 'Home',
      linkTo: '/',
    },
    {
      label: 'Profile',
      linkTo: `/profile/${Number(userId)}`,
    },
    {
      label: 'Settings',
      linkTo: '/',
    },
    {
      label: 'Edit profile',
      linkTo: `/update/profile/${data?.results[0].id}`,
    },
  ];
  const { user, logout } = useAuth();

  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(null);
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  // const avator = data.avator;
  const handleClose = () => {
    setOpen(null);
  };

  const userToken = localStorage.getItem('Token');
  const handleLogout = async () => {
    const query = {
      path: `/api/logout/`,
      token: userToken,
    };
    const res = await LogoutUser(query);
    if (res.error) {
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    } else {
      handleReload();
      console.log('logouted');
      localStorage.removeItem('userId');
      localStorage.removeItem('Token');

      enqueueSnackbar('logout success!');
      if (isMountedRef.current) {
        handleClose();
      }
      navigate('/');
    }
  };

  return (
    <>
      {isSuccess ? (
        <IconButtonAnimate
          onClick={handleOpen}
          sx={{
            p: 0,
            ...(open && {
              '&:before': {
                zIndex: 1,
                content: "''",
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
              },
            }),
          }}
        >
          <MyAvatar myphoto={data.results[0].avator} others={{ width: '10px', height: '10px' }} />
        </IconButtonAnimate>
      ) : (
        <MyAvatar
          myphoto={'https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg'}
          others={{ width: '10px', height: '10px' }}
        />
      )}

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userEmail1}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
