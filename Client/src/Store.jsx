import {configureStore} from "@reduxjs/toolkit";
import myans from './CartSlice';

const Store = configureStore({
    reducer:{
        mycart:myans
    }
})


export default Store;