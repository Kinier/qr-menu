import { Box, Grid, Paper } from "@mui/material";
import OrdersStatistics from "../statistics/OrdersStatistics";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useProfileQuery } from "../../store/apis/userApi";

export default function Main() {
    
    return (


        <Grid container spacing={3}>
            {/* <Grid item xs={6} sx={{ padding: '20px', flexFlow: 'row' }}>
                {isSuccess && <Paper sx={{textAlign: 'center'}}>
                    <Box sx={{minWidth:'50%'}}
                        component="img"
                        src={image ? URL.createObjectURL(image) : ''}
                    />
                    <Box sx={{minWidth:'50%'}}>Restaurant QR</Box>
                    
                </Paper>}
            </Grid>
            <Grid item xs={6} sx={{ padding: '20px' }}>
                {isSuccess && <Paper>
                    <Box sx={{width:'100%', height:'100%'}}
                        component="img"
                        src={image ? URL.createObjectURL(image) : ''}
                    />
                </Paper>}
            </Grid>
            <Grid item xs={6} sx={{ padding: '20px' }}>
                {isSuccess && <Paper>
                    <Box sx={{width:'100%', height:'100%'}}
                        component="img"
                        src={image ? URL.createObjectURL(image) : ''}
                    />
                </Paper>}
            </Grid> */}
        </Grid>
    )
}