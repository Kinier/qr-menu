import AppHeader from "./header/AppHeader"
import SideMenu from "./side/SideMenu"
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState, store } from '../store/index';
import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import OrdersSocket from "./OrdersSocket";
function Layout() {
    console.log("Подгрузочка")
    const user = useSelector((state: RootState)=> state.users)
    const navigate = useNavigate()
    const drawerWidth: number = 240;
    const [mobileOpen, setMobileOpen] = useState(false);


    useEffect(() => {
        console.log("Сюда зашло")
        if (!user.isAuthenticated) {
            navigate('login')
        }
    }, [user.isAuthenticated])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            {!user.isAuthenticated && <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            }
            {user.isAuthenticated && (
                <>
                    <OrdersSocket/>
                    <AppHeader drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
                    <SideMenu drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
                    <Outlet />
                </>
            )}

        </>
    )
}

export default Layout