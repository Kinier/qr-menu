import { AddTwoTone } from "@mui/icons-material";
import { SxProps, Zoom, Fab } from "@mui/material";
import { useState } from "react";
import AddMenuDialog from "../dialogs/AddMenu/AddMenuDialog";

const fabStyle = {
    position: 'fixed' as 'fixed',
    bottom: 16,
    right: 16,
};
const fab = {
    color: 'primary' as 'primary',
    sx: fabStyle as SxProps,
    icon: <AddTwoTone />,
    label: 'Add',
}

export function AddMenuButton() {
    const [visibleState, setVisibleState] = useState(false)
    const onClose = () => {
        setVisibleState(!visibleState)
    }
    return (
        <>
            <Zoom
                in={true}
                timeout={1000}
                style={{
                    transitionDelay: `1000ms`
                }}
                unmountOnExit
            >
                <Fab sx={fab.sx} aria-label={fab.label} color={fab.color} onClick={() => onClose()}>
                    {fab.icon}
                </Fab>
            </Zoom>
            <AddMenuDialog open={visibleState} onClose={onClose}/>
        </>
    )
}