import React, { useEffect, useRef, useState } from 'react';
import { Button, Slide, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addToBasket, clearBasket, deleteFromBasket } from '../store/features/basketSlice';
import OrdersSocket from './OrdersSocket';
import { useLocation, useParams } from 'react-router-dom';
import { table } from 'console';

export const SlidingBlock = ({setOpen: setOpen, open: open, bref: bref}: {setOpen: any, open: any, bref:any}) => {
  
  const location = useLocation();
  const establishmentId = location.pathname.split('/')[1];
  const [tableNumber, setTableNumber] = useState('');
  const [message, setMessage] = useState('');
  const [sendMessage, setSendMessage] = useState(false);
  const [generalPrice, setGeneralPrice] = useState(0);
  const dispatch = useDispatch()
  const basket = useSelector((state: RootState)=> state.basket)
  const blockRef = useRef(null);
  
  const handleButtonClick = () => {
    setOpen(!open);
  };

  const handleAddItem = (food: any) => {
    const newItem = {
      title: food.title,
      quantity: 1,
      price: food.price,
    };
    // setOrderItems([...orderItems, newItem]);
  };

  const handleDeleteItem = (id: any) => {
    dispatch(deleteFromBasket(id))
    // const updatedItems = [...orderItems];
    // updatedItems.splice(index, 1);
    // setOrderItems(updatedItems);
  };

  const handleTableNumberChange = (event: any) => {
    setTableNumber(event.target.value);
  };

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleOrderSubmit = async () => {
    // Handle order submission logic
    // You can access orderItems, tableNumber, and message here
    // e.g., send the order to a server or perform further processing
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: basket.products,
        table: tableNumber,
        establishmentId: establishmentId,
        message: message
      })
    });
    const data = await response;
    
    setSendMessage(true);
    dispatch(clearBasket());
    // Reset the form fields after submission
    // setOrderItems([]);
    setTableNumber('');
    setMessage('');
  };
  const handleClickOutside = (event: any) => {
    if (
      blockRef.current &&
      !(blockRef.current as HTMLElement).contains(event.target) &&
      !bref.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };


  useEffect(() => {
    // Add event listener for clicks outside the block
    document.addEventListener('click', handleClickOutside);
    console.log(establishmentId, "sfsdfsfds")
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(()=>{
    let gPrice = 0;
    for (let i = 0; i < basket.products.length; i++) {
      gPrice += (basket.products as any)[i].price * (basket.products as any)[i].quantity;
    }
    console.log(gPrice, "sdasddas")
    setGeneralPrice(gPrice);
  }, [basket])

  return (
    <div>
      
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <div ref={blockRef}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
            position: 'fixed',
            top: 0,
            right: 0,
            width: '400px',
            height: '100vh',
            padding: '16px',
            zIndex: 9999,
            transition: 'filter 0.3s ease-in-out', // Smooth transition effect
            borderRadius: '4px'
          }}
        >
          <h2>Order Food</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {basket?.products?.map((item: any, index) => (
                  <TableRow key={index}>
                    <TableCell>{item?.title}</TableCell>
                    <TableCell>{item?.quantity}</TableCell>
                    <TableCell>{item?.priceGeneral.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button onClick={() => dispatch(deleteFromBasket(item))} variant="outlined" size="small">
                        -
                      </Button>

                      <Button onClick={() => dispatch(addToBasket(item))} variant="outlined" size="small">
                        +
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <p>Total Price: {generalPrice.toFixed(2)} byn</p>
          <TextField
            label="Table Number"
            value={tableNumber}
            onChange={handleTableNumberChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Message"
            value={message}
            onChange={handleMessageChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleOrderSubmit} fullWidth variant="contained"  sx={{backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black'}}>
            Order
          </Button>
          <OrdersSocket sendMessage={sendMessage} setSendMessage={setSendMessage} msg={establishmentId}/>
        </div>
      </Slide>
    </div>
  );
};
