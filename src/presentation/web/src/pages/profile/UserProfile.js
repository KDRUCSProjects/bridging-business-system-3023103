import { useState } from 'react';
import { useParams } from 'react-router';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// hook
import useLocales from '../../hooks/useLocales';
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds, _userGallery } from '../../@fake-db';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { Profile, ProfileCover, ProfileProductList } from '../../sections/profile';
import ProfileProductListt from '../../sections/profile/ProfileProductListt';
import BaseApi from '../../store/BaseApi';
import Dashboard from '../../sections/profile/Dashboard';
import AccountChangePassword from '../../sections/@dashboard/user/account/AccountChangePassword';
// ----------------------------------------------------------------------
const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));
// ----------------------------------------------------------------------
export default function BusinessProfile() {
  const { id } = useParams();
  const { data: userdata } = BaseApi.useGetSpecificUserQuery(`api/users/${id}/`);
  const { data, isError, isSuccess, isLoading } = BaseApi.useGetSpecificUserQuery(`api/business_profile/?user=${id}`);
  const { data: newdata } = BaseApi.useGetAllProductsQuery(`api/product/?user=${id}`);
  const { translate } = useLocales();
  const { themeStretch } = useSettings();
  const { currentTab, onChangeTab } = useTabs('About');
  const [findFriends, setFindFriends] = useState('');

  const handleFindFriends = (value) => {
    setFindFriends(value);
  };

  const PROFILE_TABS = [
    {
      value: 'About',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile myProfile={data} userdata={userdata} posts={_userFeeds} />,
    },
    {
      value: 'Products',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <ProfileProductList gallery={_userGallery} newdata={newdata} />,
    },
  ];
  return isSuccess ? (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ marginTop: '6rem', marginBottom: '3rem' }}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover myProfile={data} condition={1} />
          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={tab.value} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  ) : (
    'Data not found'
  );
}
