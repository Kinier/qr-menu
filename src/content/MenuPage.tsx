import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useGetAllCategoriesByMenuIdQuery } from '../store/apis/categoryApi';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store/index";
import { addToBasket } from '../store/features/basketSlice';
const MenuPage = () => {
    const { menuId } = useParams();
    const dispatch = useDispatch()
    const basket = useSelector((state: RootState)=> state.basket)

    const [categories, setCategories] = useState<any>([])
    const [items, setItems] = useState<any>({})
    const [state, updateState] = useState(false);
    const bufItems = useRef<any>({});


    useEffect(() => {


        const _ = async () => {
            // const bufItems: any = {};
            bufItems.current = {};
            let bufCategories: any = [];
            bufCategories = await fetch(`${process.env.REACT_APP_API_URL}/category/menu/${menuId}`)
                .then(categoriesArray => categoriesArray.json()
                    .then(data => data))
                    for (const [index, category] of bufCategories.entries()) {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/category/${category.id}/photo`);
                        const blob = await response.blob();
                        console.log(blob);
                        bufCategories[index].photo = blob;
                    }
            setCategories(bufCategories)

            for (let value of bufCategories) {
                


                // bufForBuf - все items для категории( массив )
                const bufForBuf = await fetch(`${process.env.REACT_APP_API_URL}/item/category/${value.id}`)
                    .then(itemsArray => itemsArray.json()
                        .then(itemsArray => itemsArray))

                for (const [index, item] of bufForBuf.entries()) {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/item/${item.id}/photo`);
                    const blob = await response.blob();
                    console.log(blob);
                    bufForBuf[index].photo = blob;
                }
                

                bufItems.current[value.id] = bufForBuf;
            }
            setItems(bufItems.current)
        }



        _();








    }, [])
    
    return (
        <Box sx={{ textAlign: 'center' }}>

            {categories.map((category: any, index: any) => (

                <div key={index}>
                    <Typography variant="h4">{category.name}</Typography>
                    <Typography variant="body1" color="textSecondary">{category.description}</Typography>
                    <Card>
                        <CardMedia
                            component="img"
                            height="200"
                            image={category.photo?  URL.createObjectURL(category.photo) : ''}
                            alt={category.name}
                        />
                        <CardContent>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
                                {items[+category.id]?.map((item: any, itemIndex: any) => {
                                    return (
                                        <Card key={itemIndex} style={{ maxWidth: '300px' }}>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={item.photo?  URL.createObjectURL(item.photo) : ''}
                                                alt={item.name}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                                                <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '8px' }}>
                                                    {item.price.toFixed(2)} byn
                                                </Typography>
                                                <Button variant="contained" size="small" sx={{ marginTop: '8px' }} onClick={()=>dispatch(addToBasket({id: item.id, title: item.name, quantity: 1, price: item.price}))}>
                                                    Add to Order
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </Box>
    );
};

export default MenuPage;