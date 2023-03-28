import { Dispatch, Middleware, MiddlewareAPI, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '..';
import jwt_decode, { JwtPayload } from 'jwt-decode'

// interface UserData{
//   email: string,
//   password: string,
//   restaurantId: number
// }
interface UserData {
  access_token: string,
  isAuthenticated: boolean
}




// const initialState: MenuCardState = {
//   name: "name",
//   description: "description",
//   status: true
// }
// const initialState: UserData = 
//   {email: "name", password: "description", restaurantId: 1}
// ;
const initialState: UserData =
{
  access_token: localStorage.getItem('access_token') || '',
  isAuthenticated: localStorage.getItem('access_token') ? true : false
}
  ;

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // changeStatus: (state , action: PayloadAction<number>) => {
    //   // state.forEach((menu)=>{
    //   //   if (menu.id === action.payload)
    //   //       menu.status = !menu.status;
    //   // })
    //   // state[action.payload].status = !state[action.payload].status
    // },
    setToken: (state, action: PayloadAction<{ access_token: string }>) => {
      state.access_token = action.payload.access_token;
      localStorage.setItem('access_token', action.payload.access_token)
      state.isAuthenticated = true;
    },
    clearToken: (state) => {
      state.access_token = '';
      localStorage.setItem('access_token', '')
      state.isAuthenticated = false;
    },

  },

})

// Action creators are generated for each case reducer function
export const { setToken, clearToken } = usersSlice.actions

export default usersSlice.reducer


// Check JWT expiration on each store update

export const checkTokenExpirationMiddleware = ({ getState, dispatch }: { getState: any, dispatch: any }) => (next: any) => (action: any) => {
  const state = getState();
  if (state.users.access_token === '')
    return next(action)
  // // if (action.type === 'user/clearToken')
  // //   return next(action)
  const decoded = jwt_decode<JwtPayload>(state.users.access_token)
  const exp = decoded?.exp!

  const now = new Date().getTime() / 1000;
  // console.log(exp-now, exp > now)
  if (action.type !== 'user/clearToken' && action.type !== 'user/setToken') { // ? любое действие кроме удаление токена
    console.log(exp - now, now > exp)

    if (now > exp) {
      dispatch(clearToken())
    }
  }




  return next(action);
};
