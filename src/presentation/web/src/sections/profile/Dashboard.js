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
  const { data } = BaseApi.useGetAllProductsQuery(`api/product/?user=${id}`);

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
        <Grid item xs={12} md={6}>
          <AppWidgetSummary
            title="Total Products"
            total={totalquantities}
            chartColor={theme.palette.primary.main}
            chartData={results}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppWidgetSummary
            title="Net Worth"
            total={totalPrice}
            chartColor={theme.palette.chart.blue[0]}
            chartData={prices}
          />
        </Grid>

        <Grid item xs={12} md={6}>
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

        <Grid item xs={12} md={8} lg={6}>
          <AppCurrentDownload
            title="Statistic"
            chartColors={[theme.palette.primary.light, theme.palette.secondary.main]}
            chartData={[
              { label: 'Net Worth', value: totalPrice },
              { label: 'Expenses', value: ordersum },
            ]}
          />
        </Grid>
      </Grid>
    </Page>
  );
}
