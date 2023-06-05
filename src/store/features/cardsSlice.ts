import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface MenuCard{
  id: number,
  name: string,
  description: string,
  status: boolean
}

type setNamePayload = {
  id: number,
  name: string
}


// const initialState: MenuCardState = {
//   name: "name",
//   description: "description",
//   status: true
// }
const initialState: Array<MenuCard> = [
  {id: 0, name: "main", description: "main items", status: true},
  {id: 1, name: "hot dishes", description: "heated food", status: true}
];

export const cardsSlice: any = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    changeStatus: (state , action: PayloadAction<number>) => {
      state.forEach((menu)=>{
        if (menu.id === action.payload)
            menu.status = !menu.status;
      })
      // state[action.payload].status = !state[action.payload].status
    },
    setName: (state, action: PayloadAction<setNamePayload>) => {
      state.forEach((menu)=>{
        if (menu.id === action.payload.id)
            menu.name = action.payload.name;
      })
      // state[action.payload.id].name = action.payload.name
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeStatus, setName } = cardsSlice.actions

export default cardsSlice.reducer