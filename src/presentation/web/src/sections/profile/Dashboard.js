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
import AppAreaInstalled from '../@dashboard/general/app/AppAreaInstalled';
import BaseApi from '../../store/BaseApi';
// ----------------------------------------------------------------------

export default function Dashboard(id) {

  const { data } = BaseApi.useGetAllProductsQuery(`api/product/?user=${id.id}`);
  const newdata = data?.results;
  const { user } = useAuth();
  const theme = useTheme();
  const totalquantities = sum(newdata?.map((item) => item.quantity));
  const { themeStretch } = useSettings();
  const results = newdata?.map((item) => item.quantity)
  return (
    <Page title="General: App">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <AppWelcome
            title={`Welcome back! \n`}
            description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="Total Products"
            percent={2.6}
            total={totalquantities}
            chartColor={theme.palette.primary.main}
            chartData={results}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppWidgetSummary
            title="Total Installed"
            percent={0.2}
            total={4876}
            chartColor={theme.palette.chart.blue[0]}
            chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppWidgetSummary
            title="Total Downloads"
            percent={-0.1}
            total={678}
            chartColor={theme.palette.chart.red[0]}
            chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Current Download"
            chartColors={[
              theme.palette.primary.light,
              theme.palette.primary.light,
              theme.palette.primary.main,
              theme.palette.primary.dark,
            ]}
            chartData={[
              { label: 'Mac', value: 12244 },
              { label: 'Window', value: 53345 },
              { label: 'iOS', value: 44313 },
              { label: 'Android', value: 78343 },
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
