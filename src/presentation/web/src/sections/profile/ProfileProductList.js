import sumBy from 'lodash/sumBy';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
  Card,
  TablePagination,
  Box,
  IconButton,
  Typography,
  CardContent,
  Button,
  Grid,
} from '@mui/material';
// utils
import filterObject from '../../utils/filterObject';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
import useTabs from '../../hooks/useTabs';
import cssStyles from '../../utils/cssStyles';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import LightboxModal from '../../components/LightboxModal';
import useSettings from '../../hooks/useSettings';
import InvoiceTableToolbar from '../@dashboard/invoice/list/InvoiceTableToolbar';

// import { InvoiceTableRow, InvoiceTableToolbar } from '../../sections/@dashboard/invoice/list';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'invoiceNumber', label: 'Client', align: 'left' },
  { id: 'createDate', label: 'Create', align: 'left' },
  { id: 'dueDate', label: 'Due', align: 'left' },
  { id: 'price', label: 'Amount', align: 'center', width: 140 },
  { id: 'sent', label: 'Sent', align: 'center', width: 140 },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

const CaptionStyle = styled(CardContent)(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.grey[900] }),
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'space-between',
  color: theme.palette.common.white,
}));
// ----------------------------------------------------------------------

ProfileGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
};

export default function ProfileGallery({ gallery, newdata }) {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });
  console.log(newdata);
  console.log('new data : ', newdata.results);
  const [tableData, setTableData] = useState(newdata.results);

  const [filterName, setFilterName] = useState('');

  const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterService = (event) => {
    setFilterService(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterService,
    filterStatus,
    filterStartDate,
    filterEndDate,
  });
  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterService) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  const denseHeight = dense ? 56 : 76;

  const getLengthByStatus = (status) => tableData.filter((item) => item.status === status).length;

  const getTotalPriceByStatus = (status) =>
    sumBy(
      tableData.filter((item) => item.status === status),
      'totalPrice'
    );

  const getPercentByStatus = (status) => (getLengthByStatus(status) / tableData.length) * 100;

  const data = newdata.results;
  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const imagesLightbox = data.map((item) => item.images[0]?.image);
  const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };
  return (
    <Box sx={{ mt: 5 }}>
      <Card>
        <InvoiceTableToolbar
          filterName={filterName}
          filterService={filterService}
          filterStartDate={filterStartDate}
          filterEndDate={filterEndDate}
          onFilterName={handleFilterName}
          onFilterService={handleFilterService}
          onFilterStartDate={(newValue) => {
            setFilterStartDate(newValue);
          }}
          onFilterEndDate={(newValue) => {
            setFilterEndDate(newValue);
          }}
          optionsService={['SERVICE_OPTIONS', 'saboor ', 'hemat']}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={10}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              All Your Products
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button href="/user/ad/product" variant="contained">
              My Button
            </Button>
          </Grid>
        </Grid>
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
            }}
          >
            {dataFiltered.map((item) => (
              <GalleryItem key={item.id} item={item} onOpenLightbox={handleOpenLightbox} />
            ))}
          </Box>

          <LightboxModal
            images={imagesLightbox}
            mainSrc={imagesLightbox[selectedImage]}
            photoIndex={selectedImage}
            setPhotoIndex={setSelectedImage}
            isOpen={openLightbox}
            onCloseRequest={() => setOpenLightbox(false)}
          />
        </Card>
        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataFiltered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Box>
      </Card>
      {/* <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            All Your Products
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button href="/user/ad/product" variant="contained">
            My Button
          </Button>
        </Grid>
      </Grid> */}

      {/* <Card sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {data.map((item) => (
            <GalleryItem key={item.id} item={item} onOpenLightbox={handleOpenLightbox} />
          ))}
        </Box>

        <LightboxModal
          images={imagesLightbox}
          mainSrc={imagesLightbox[selectedImage]}
          photoIndex={selectedImage}
          setPhotoIndex={setSelectedImage}
          isOpen={openLightbox}
          onCloseRequest={() => setOpenLightbox(false)}
        />
      </Card> */}
    </Box>
  );
}

// ----------------------------------------------------------------------

GalleryItem.propTypes = {
  image: PropTypes.object,
  onOpenLightbox: PropTypes.func,
};

function GalleryItem({ item, onOpenLightbox }) {
  const { id, images, name } = item;
  return (
    <Card sx={{ cursor: 'pointer', position: 'relative' }}>
      <Image alt="gallery image" ratio="1/1" src={images[0]?.image} onClick={() => onOpenLightbox(images[0]?.image)} />

      <CaptionStyle>
        <div>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.72 }}>
            {'fDate(postAt)'}
          </Typography>
        </div>
        <IconButton color="inherit">
          <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
        </IconButton>
      </CaptionStyle>
    </Card>
  );
}

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
  filterService,
  filterStartDate,
  filterEndDate,
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  console.log('filterName', filterName);
  if (filterName) {
    tableData = filterObject(tableData, { name: filterName });
    console.log('table data', tableData);
    // tableData = tableData.filter((item) => item.name.toLowerCase().includes(filterName.toLowerCase()) !== tableData);
  }
  console.log('tableData', tableData);
  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterService !== 'all') {
    tableData = tableData.filter((item) => item.items.some((c) => c.service === filterService));
  }

  if (filterStartDate && filterEndDate) {
    tableData = tableData.filter(
      (item) =>
        item.createDate.getTime() >= filterStartDate.getTime() && item.createDate.getTime() <= filterEndDate.getTime()
    );
  }

  return tableData;
}
