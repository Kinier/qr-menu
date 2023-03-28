import { Grid, Paper } from "@mui/material";
import { ResponsiveContainer } from "recharts";

export default function DefaultStatisticsContainer({children}: {children: any}) {
    return (
        <Grid item xs={6} sx={{ padding: '20px' }}>
            <Paper sx={{ p: 2 }}>
                <ResponsiveContainer width={400} height={300}>
                    {children}
                </ResponsiveContainer>
            </Paper>
        </Grid>
    )
}