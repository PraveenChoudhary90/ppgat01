import { createSlice } from "@reduxjs/toolkit";

const Carts = createSlice({
    name:"mycart",
    initialState:{ 
        cart:[]
    },
    reducers:{
        Addtocart:(state,actions)=>{
            console.log(actions.payload);
        }
    }
})


 export const  {Addtocart}  = Carts.actions;
export default Carts.reducer;