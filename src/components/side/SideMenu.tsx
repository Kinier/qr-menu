import { Box, Drawer, Toolbar, Typography } from "@mui/material";
import { PagesList } from "../lists/PagesList";
import iconpic from "../../cooking.png";
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
                        <Toolbar sx={{ justifyContent: 'center', alignItems: 'center' }} children={
                            <Typography >Org. logo</Typography>
                            
                        } />
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

                        <Toolbar sx={{ justifyContent: 'center', alignItems: 'center' }} children={
                        // <Typography >Org. logo</Typography>
                        <Box
                                component="img"
                                sx={{
                                    height: 40,
                                    width: 40,
                                    maxHeight: { xs: 60, md: 60 },
                                    maxWidth: { xs: 60, md: 60 },
                                }}
                                alt="iconpic"
                                src={iconpic}
                            />
                        } />
                    </div>
                    <PagesList />
                </Drawer>

            </Box>

        </>
    )
}

export default SideMenu;