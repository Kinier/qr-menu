
import { useSelector } from "react-redux";

import type { RootState } from "../store";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { store } from "../store";
import { Snackbar, Alert } from "@mui/material";

const socket = io(`${process.env.REACT_APP_API_URL}`, {
    // extraHeaders: {
    //     Authorization: `Bearer ${store.getState().users.access_token}`
    // }
})



export default function OrdersSocket({sendMessage, setSendMessage, msg}: {sendMessage: boolean, setSendMessage: any, msg: any}) {
    // const isNewOrder = useSelector((state: RootState)=> state.order.isNewOrder)
    const [isNewOrder, setNewOrderState] = useState(false)
    const dispatch = useDispatch()
    socket.on('connect', () => {
        console.log('aaaaaaaaaaaaaaaa')
    })


    useEffect(() => {
        socket.on('recMessage', () => {
            setNewOrderState(true)
        });
        return () => {
            socket.off('orderByClient');
        };
    }, []);

    useEffect(()=>{
        
        if (sendMessage === true){
            console.log("asdasdasdadad")
            const toSend = {
                "establishmentId": +msg,
                "items": [{}, {}, {}, {}, {}],
                "table": 1
            }
            socket.emit('orderByClient', toSend)
            setSendMessage(false);
        }
        
    }, [sendMessage])
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