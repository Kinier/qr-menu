import { MailOutlined } from "@mui/icons-material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap } from "@mui/material";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BarChartIcon from '@mui/icons-material/BarChart';
import { OverridableComponent } from "@mui/material/OverridableComponent";

const pages = new Map<string, any>();
pages.set('dashboard', BarChartIcon);
pages.set('menus', RestaurantMenuIcon);
pages.set('orders', ListAltIcon)
pages.set('profile', AdminPanelSettingsIcon);
pages.set('settings', SettingsIcon);







export function PagesList() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(location.pathname)
    }, [location])



    return (
        <>
            <>

                <Divider />

                <List>
                    
                    {Array.from(pages.entries()).map(([page, Icon]) => {
                        const url = new RegExp(`/${page}(.*?)`);
                        return (
                            <ListItem key={page} disablePadding onClick={() => navigate(page)}>

                                <ListItemButton selected={url.test(location.pathname) ? true : false}>
                                    <ListItemIcon>
                                        <Icon/>
                                    </ListItemIcon>
                                    <ListItemText primary={page} />
                                </ListItemButton>

                            </ListItem>
                        )
                    })}



                    

                </List>
            </>
        </>
    )
}