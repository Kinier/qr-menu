import { Dispatch, Middleware, MiddlewareAPI, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '..';

interface BasketSlice {
  products: []
}





const initialState: BasketSlice =
{
  products: []
}
  ;

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {

    
    addToBasket: (state, action: PayloadAction<any>) => {
      let products: any = state.products;
      let isAdded = false;
      let index = -1;

      for (let i = 0; i < products.length; i++) {
        if (products[i].id === action.payload.id) {
          isAdded = true;
          index = i;
          break;
        }
      }
      console.log(action.payload.price)
      if (isAdded) {
        products[index].quantity += 1;
        products[index].priceGeneral += action.payload.price
      } else {
        let b = action.payload
        b.priceGeneral = action.payload.price;
        products.push(b);

      }

      state.products = products;
    },
    deleteFromBasket: (state, action: PayloadAction<any>) => {
      let products: any = state.products;
      let isDeleted = false;
      let index = -1;

      for (let i = 0; i < products.length; i++) {
        console.log(products[i].id, action.payload.id)
        if (products[i].id === action.payload.id) {
          isDeleted = true;
          index = i;
          break;
        }
      }


      if (isDeleted) {
        if (products[index].quantity > 1) {
          products[index].quantity -= 1;
          products[index].priceGeneral -= action.payload.price
        }else{
          products.splice(index, 1)
        }
      } else {
        products.splice(index, 1)
      }

      state.products = products;
    },
    clearBasket: (state) => {
      state.products = []
    }

  },

})

// Action creators are generated for each case reducer function
export const { addToBasket, deleteFromBasket, clearBasket } = basketSlice.actions

export default basketSlice.reducer
