import { createSlice } from "@reduxjs/toolkit";

const Carts = createSlice({
    name:"mycart",
    initialState:{ 
        cart:[]
    },
    reducers:{
        Addtocart:(state,actions)=>{
            console.log(actions.payload);
           const CartData = state.cart.filter(key=>key.id===actions.payload.id);
           if(CartData.length>=1){
            alert("data already seleted")
           }
           else{
            state.cart.push(actions.payload);
           }
        },
        Increment:(state,actions)=>{
           for(let i=0;i<state.cart.length;i++){
            if(state.cart[i].id==actions.payload.id){
                state.cart[i].qty++;
            }
           }
        },
        Decrement:(state, actions)=>{
        for(let i = 0;i<state.cart.length;i++){
            if(state.cart[i].id==actions.payload.id){
            if(state.cart[i].qty<=1){
                alert("you can not less then seletced one product")
            }
            else{
                state.cart[i].qty--;
            }
        }
    }
        },

        RemoveItem:(state, actions)=>{
            state.cart=state.cart.filter(key=>key.id!=actions.payload.id);
            alert("Product Delete");
        }
    }
})


 export const  {Addtocart, Increment, Decrement, RemoveItem}  = Carts.actions;
export default Carts.reducer;