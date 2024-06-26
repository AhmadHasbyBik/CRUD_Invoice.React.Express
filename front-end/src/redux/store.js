import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice'; // Sesuaikan dengan nama slice dan path yang sesuai
import invoiceReducer from './invoiceSlice'; // Sesuaikan dengan nama slice dan path yang sesuai

const store = configureStore({
  reducer: {
    products: productReducer,
    invoices: invoiceReducer,
    // tambahkan reducers lain jika ada
  },
});

export default store;
