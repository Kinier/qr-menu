import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import OrderItemsDialog from '../dialogs/OrderItems/OrderItemsDialog';
import { useDispatch } from 'react-redux';
import { isNewFalse } from '../../store/features/newOrderSocketSlice';


export default function OrdersTable() {
    const token = useSelector((state: RootState) => state.users.access_token)
    const socketNotif = useSelector((state: RootState) => state.newOrderSocket.isNew)
    const [orders, setOrders] = useState<any>([])
    const [open, setOpen] = useState(false);
    const [ba, setBa] = useState(null)
    const dispatch = useDispatch()
    const onClose = (data: any) => {
        setBa(data)
        setOpen(!open);
    }
    const _ = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        for (const [index, order] of data?.entries()) {
            const date = new Date(order.created_at);

            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');;
            const seconds = date.getSeconds();



            data[index].created_at = `${hours}:${minutes}:${seconds}`;


            const response = await fetch(`${process.env.REACT_APP_API_URL}/order-item/order/${order.id}`);
            const orderItems = await response.json();
            // цикл для взятия цен из orderItems
            let general: number = 0;
            orderItems.forEach((orderItem: any, index: any) => {
                general += orderItem.price * orderItem.quantity;
            })
            data[index].total = general;
            data[index].items = orderItems
        }
        data.sort((a: any, b: any) => b.status - a.status);
        setOrders(data)
    }
    useEffect(() => {
        _();
    }, [])
    useEffect(() => {
        if (socketNotif) {
            _();
            dispatch(isNewFalse())
        }
    }, [socketNotif])
    const [showPanel, setShowPanel] = useState(false);

    const handlePanelClick = () => {
        setShowPanel(!showPanel);
    };

    const changeOrderStatus = async (orderId: number, event: any, index: any) => {
        if (event.target.value) {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/order/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: +event.target.value
                })
            });
        }
        // const buf = orders;
        // buf[index].status = +event.target.value;
        // setOrders(buf);
        _();
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order Id</TableCell>
                        <TableCell align="right">Created</TableCell>
                        <TableCell align="right">Table number</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order: any, index: any) => (
                        <TableRow
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            onClick={() => onClose(order)}
                        >
                            <TableCell component="th" scope="row">
                                {order.id}
                            </TableCell>
                            <TableCell align="right">{order.created_at}</TableCell>
                            <TableCell align="right">{order.message.split(" ")[0]}</TableCell>
                            <TableCell align="right">{order.total}</TableCell>
                            <TableCell align="right" sx={{ width: '20%', minWidth: '20%', maxWidth: '20%' }}>
                                <Select fullWidth value={order.status ?? 4} onChange={(event) => changeOrderStatus(order.id, event, index)}
                                >
                                    <MenuItem value={1}>&#128308; Cancelled</MenuItem>
                                    <MenuItem value={2}>&#128309; Confirmed</MenuItem>
                                    <MenuItem value={3}>&#9898; Pending</MenuItem>
                                    <MenuItem value={4}>&#9899; New</MenuItem>
                                </Select>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <OrderItemsDialog open={open} onClose={onClose} data={ba} />
        </TableContainer>
    );
}