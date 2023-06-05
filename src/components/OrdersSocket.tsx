
import { useSelector } from "react-redux";

import type { RootState } from "../store";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { store } from "../store";
import { Snackbar, Alert } from "@mui/material";
import { isNewTrue } from "../store/features/newOrderSocketSlice";

const socket = io(`${process.env.REACT_APP_API_URL}`, {
    extraHeaders: {
        Authorization: `Bearer ${store.getState().users.access_token}`
    }
})



export default function OrdersSocket() {
    // const isNewOrder = useSelector((state: RootState)=> state.order.isNewOrder)
    const [isNewOrder, setNewOrderState] = useState(false)
    const socketNotif = useSelector((state: RootState) => state.newOrderSocket.isNew)
    const dispatch = useDispatch()
    socket.on('connect', () => {
        console.log('aaaaaaaaaaaaaaaa')
    })


    useEffect(() => {
        socket.on('orderByClient', () => {
            setNewOrderState(true)
            dispatch(isNewTrue())
        });
        return () => {
            socket.off('orderByClient');
        };
    }, []);
    return (
        <>
            <Snackbar open={isNewOrder} autoHideDuration={6000} onClose={() => setNewOrderState(false)} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert severity="info" sx={{ width: '100%' }}>
                    New Order
                </Alert>
            </Snackbar>
        </>
    )
}