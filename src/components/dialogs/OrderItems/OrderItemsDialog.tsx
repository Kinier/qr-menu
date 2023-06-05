import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Divider, Paper } from "@mui/material";



interface Props {
    open: boolean;
    onClose: (data: any) => void;
    data: any
}

const OrderItemsDialog: React.FC<Props> = ({ open, onClose, data }) => {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        const _ = async () => {

            if (open) {
                console.log(data)

                const response = await fetch(`${process.env.REACT_APP_API_URL}/order-item/order/${data.id}`);
                const orderItems = await response.json();



                let buf = orderItems;
                for (const [index, item] of orderItems?.entries()) {

                    const response = await fetch(`${process.env.REACT_APP_API_URL}/item/${item.itemId}`);
                    const itemObject = await response.json();
                    buf[index].title = itemObject.name
                    // buf[index].orderId = data[index].id
                }
                setItems(buf);
            }else{
                setItems([])
            }
        }

        _()
    }, [open])
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Order items</DialogTitle>
            <DialogContent sx={{ width: "60vw", height: "60vh" }}>
                {items?.map((item: any, index: any) => {
                    return (
                        <>
                            <Paper key={index}>

                                <Typography>Title - {item?.title}</Typography>
                                <Typography>Price - {item.price} byn</Typography>
                                <Typography>Quantity - {item.quantity}</Typography>
                                
                                <Divider />
                            </Paper>
                        </>
                    )



                })}
                <Typography>Additional info - {data?.message}</Typography>
            </DialogContent>
        </Dialog>
    );
};

export default OrderItemsDialog;