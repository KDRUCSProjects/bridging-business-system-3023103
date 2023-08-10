// @mui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
// hooks
import sum from 'lodash/sum';
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import AppWelcome from '../@dashboard/general/app/AppWelcome';
import AppWidgetSummary from '../@dashboard/general/app/AppWidgetSummary';
import AppCurrentDownload from '../@dashboard/general/app/AppCurrentDownload';
import RattingWidgetSum from '../@dashboard/general/app/RattingWidgetSum';

import AppAreaInstalled from '../@dashboard/general/app/AppAreaInstalled';
import BaseApi from '../../store/BaseApi';
// ----------------------------------------------------------------------

export default function Dashboard({ id, orderdata }) {
  const { data } = BaseApi.useGetAllProductsQuery(`api/product/?user=${id.id}`);
  // -------------------------- getting products data ----------------------------------------
  const newdata = data?.results;
  const { user } = useAuth();
  const theme = useTheme();
  const totalquantities = sum(newdata?.map((item) => item.quantity));
  const totalPrice = sum(newdata?.map((item) => item.quantity * item.price));
  const avgrating = sum(newdata?.map((item) => item.ratting));
  const total = sum(newdata?.map((item) => item.productRatting.length));
  const totalrating = newdata?.map((item) => item.ratting);
  const totalavg = avgrating / totalrating?.length;
  const results = newdata?.map((item) => item.quantity);
  const prices = newdata?.map((item) => item.price);
  // -------------------------------------------------------------------------------------------
  // ------------------------ getting order list data ------------------------------------------
  const ordersum = sum(orderdata?.map((item) => item.total));
  const ordersPrices = orderdata?.map((item) => item.total);

  const purchasedProducts = sum(
    orderdata?.map((item) => {
      return sum(
        item.order_details.map((item1) => {
          return item1.quantity;
        })
      );
    })
  );

  const purchasedProductsPerOrder = orderdata?.map((item) => {
    return sum(
      item.order_details.map((item1) => {
        return item1.quantity;
      })
    );
  });
  // ---------------------------------------------------------------------------------------------
  const { themeStretch } = useSettings();
  return (
    <Page title="Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <AppWelcome
            title={`Welcome back! \n`}
            description="IT IS NOT ABOUT IDEAS, IT IS ABOUT MAKING IDEAS HAPPEN {RISK}  .  LET'S START THE JOURNEY."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RattingWidgetSum rating={totalavg} total={total} chartColor={theme.palette.primary.main} />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="Total Products"
            total={totalquantities}
            chartColor={theme.palette.primary.main}
            chartData={results}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="Net Worth"
            total={totalPrice}
            chartColor={theme.palette.chart.blue[0]}
            chartData={prices}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="Purchased Products"
            total={purchasedProducts}
            chartColor={theme.palette.chart.red[0]}
            chartData={purchasedProductsPerOrder}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppWidgetSummary
            title="Expenses"
            total={ordersum}
            chartColor={theme.palette.chart.red[0]}
            chartData={ordersPrices}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppWidgetSummary
            title="unDefine"
            total={678}
            chartColor={theme.palette.chart.red[0]}
            chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Statistic"
            chartColors={[theme.palette.primary.light, theme.palette.secondary.main]}
            chartData={[
              { label: 'Net Worth', value: totalPrice },
              { label: 'Expenses', value: ordersum },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Area Installed"
            subheader="(+43%) than last year"
            chartLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']}
            chartData={[
              {
                year: '2019',
                data: [
                  { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
                  { name: 'America', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                ],
              },
              {
                year: '2020',
                data: [
                  { name: 'Asia', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                  { name: 'America', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                ],
              },
            ]}
          />
        </Grid>
      </Grid>
    </Page>
  );
}
