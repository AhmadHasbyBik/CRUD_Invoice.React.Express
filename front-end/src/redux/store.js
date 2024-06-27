import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice'; 
import invoiceReducer from './invoiceSlice'; 
const store = configureStore({
  reducer: {
    products: productReducer,
    invoices: invoiceReducer,
  },
});

export default store;
