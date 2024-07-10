import { createSlice } from "@reduxjs/toolkit"

export const menuContentMainSlice = createSlice({
    name: 'menuContentMainSlice',
    initialState: {
      menu:null
    },
    reducers: {
      transferMenuToContentMain:(state,action)=>{
        state.menu=action.payload
      }
    },
  })
export const { transferMenuToContentMain } = menuContentMainSlice.actions

export default menuContentMainSlice;