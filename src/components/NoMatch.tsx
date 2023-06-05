import { Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240

export default function NoMatch() {

    return (
        <>
            <Box component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Typography paragraph={true} variant={'h1'} align="center">
                    Page not found
                </Typography>
                <Link to="/">
                    <Typography paragraph={true} variant={'h2'} align='center'>
                        Go on the main page
                    </Typography>
                </Link>

            </Box>
        </>
    )
}