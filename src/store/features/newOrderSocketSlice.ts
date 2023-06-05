import { Dispatch, Middleware, MiddlewareAPI, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '..';
import jwt_decode, { JwtPayload } from 'jwt-decode'


const initialState =
{
  isNew: false,
}
  ;

export const newOrderSocketSlice = createSlice({
  name: 'newOrderSocket',
  initialState,
  reducers: {

    isNewTrue: (state) => {
      state.isNew = true;
    },
    isNewFalse: (state) => {
      state.isNew = false;
    },

  },

})

// Action creators are generated for each case reducer function
export const { isNewTrue, isNewFalse } = newOrderSocketSlice.actions

export default newOrderSocketSlice.reducer
