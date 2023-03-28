import { Dispatch, Middleware, MiddlewareAPI, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '..';
import jwt_decode, { JwtPayload } from 'jwt-decode'

// interface UserData{
//   email: string,
//   password: string,
//   restaurantId: number
// }
interface SelectedCategorySlice {
  id: null|number,
}




// const initialState: MenuCardState = {
//   name: "name",
//   description: "description",
//   status: true
// }
// const initialState: UserData = 
//   {email: "name", password: "description", restaurantId: 1}
// ;
const initialState: SelectedCategorySlice =
{
  id: null,
}
  ;

export const selectedCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState,
  reducers: {

    setCategoryId: (state, action: PayloadAction<SelectedCategorySlice>) => {
      state.id = action.payload.id
    },
    clearSelectedCategoryId: (state) => {
      state.id = null;
    },

  },

})

// Action creators are generated for each case reducer function
export const { clearSelectedCategoryId, setCategoryId } = selectedCategorySlice.actions

export default selectedCategorySlice.reducer
