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
const MenuConfig= () =>{
  const {translate} = useLocales();
  return [
    {
      title: translate('home'),
      icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
      path: '/',
    },
    {
      title: translate('pages'),
      path: '/pages',
      icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
      children: [
        {
          subheader:translate('Others'),
          items: [
            { title: translate('about us'), path: PATH_PAGE.about },
            { title: translate('contact us'), path: PATH_PAGE.contact },
          ],
    
        },
      ],
    },
  
  ];
}



export default MenuConfig;
