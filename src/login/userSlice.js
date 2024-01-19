import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState:{
        id:null,
        name:'',
    },
    reducers:{
        setUser:(state,action)=>{
            state.id = action.payload.id;
            state.name=action.payload.name;
           
        },
        removeUser:(state)=>{
            state.id=null;
            state.name =''
        }
    }
})
export const userAction = userSlice.actions
export default userSlice