import { Box, Toolbar } from '@mui/material';
import { ReactElement } from 'react';


const drawerWidth = 240

export function DefaultContainer({ Content }: { Content: ReactElement }) {
    return (
        <>
            <Box component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                

                <Toolbar />
                {Content}
            </Box>
        </>
    )
}

export default DefaultContainer;