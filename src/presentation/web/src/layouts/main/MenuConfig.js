// routes
import { PATH_PAGE } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';

// hooks
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};
const MenuConfig = () => {
  const { translate } = useLocales();
  return [
    {
      title: translate('about us'),
      icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
      path: '/about-us',
    },
    {
      title: translate('contact us'),
      path: '/contact-us',
      icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
    },
  ];
};

export default MenuConfig;
