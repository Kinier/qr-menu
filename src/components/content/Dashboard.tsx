import { Grid } from "@mui/material";
import OrdersStatistics from "../statistics/OrdersStatistics";
import BarStatistics from "../statistics/BarStatistics";
import PieStatistics from "../statistics/PieStatistics";
import AreaStatistics from "../statistics/AreaStatistics";
import ScatterStatistics from "../statistics/ScatterStatistics";
import RadialStatistics from "../statistics/RadialStatistics";

export default function Statistics() {

  return (


    <Grid container spacing={3}>
      <Grid item xs={6} sx={{ padding: '20px' }}>
        <OrdersStatistics />
      </Grid>
      <Grid item xs={6} sx={{ padding: '20px' }}>
        <BarStatistics />
      </Grid>
      <Grid item xs={6} sx={{ padding: '20px' }}>
        <PieStatistics />
      </Grid>
      <Grid item xs={6} sx={{ padding: '20px' }}>
        <AreaStatistics />
      </Grid>
      <Grid item xs={6} sx={{ padding: '20px' }}>
        <ScatterStatistics/>
      </Grid>
      <Grid item xs={6} sx={{ padding: '20px' }}>
        <RadialStatistics/>
      </Grid>
    </Grid>
  )
}