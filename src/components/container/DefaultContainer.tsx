import { Box, Grid, Paper, Toolbar } from '@mui/material';
import { ReactElement } from 'react';



export function DefaultContainer({ Content }: { Content: ReactElement }) {
    return (
        <>
            <Box component="main" width={'100%'} minHeight={'100vh'}
            >
                <Toolbar />
                <Box  sx={{ p: 2}}>
                    <Paper sx={{ p:2}} elevation={24}>
                        {Content}
                    </Paper>
                </Box>
            </Box>
        </>
    )
}

export default DefaultContainer;