import { createSlice } from "@reduxjs/toolkit"

export const overPlayMenuMainSlice = createSlice({
    name: 'overPlayMenuMain',
    initialState: {
      open:false
    },
    reducers: {
      onClickHandleOverPlay:(state,action)=>{
        console.log(action)
        state.open=action?.payload
      }
    },
  })
export const { onClickHandleOverPlay } = overPlayMenuMainSlice.actions

export default overPlayMenuMainSlice
  