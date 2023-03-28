import { Box, Drawer, Toolbar, Typography } from "@mui/material";
import { PagesList } from "../lists/PagesList";
function SideMenu({ drawerWidth, mobileOpen, handleDrawerToggle }: { drawerWidth: number, mobileOpen: any, handleDrawerToggle: any }) {

    return (
        <>
            <Box component="nav"
                sx={{
                    width: { sm: drawerWidth }, flexShrink: { sm: 0 }
                }}
                bgcolor='#B494FA'
            >
                <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth
                        },
                    }}
                >
                    <div>
                        <Toolbar sx={{justifyContent:'center', alignItems: 'center'}} children={<Typography >Org. logo</Typography>} />
                    </div>
                    <PagesList />
                </Drawer>
                <Drawer
                    variant="permanent" open
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth
                        },
                    }}
                >
                    <div>

                        <Toolbar sx={{justifyContent:'center', alignItems: 'center'}} children={<Typography >Org. logo</Typography>} />
                    </div>
                    <PagesList />
                </Drawer>

            </Box>

        </>
    )
}

export default SideMenu;