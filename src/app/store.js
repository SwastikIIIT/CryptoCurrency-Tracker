import { configureStore } from '@reduxjs/toolkit'
import { cryptoApi } from '../services/cryptoAPI'
import { cryptoMainApi } from '../services/cryptoMainApi'
import {geminiApi} from "../services/geminiAPI"


export  const store=configureStore({
  reducer: {
    [cryptoApi.reducerPath]:cryptoApi.reducer,
    [cryptoMainApi.reducerPath]:cryptoMainApi.reducer,
    [geminiApi.reducerPath]:geminiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware).concat(cryptoMainApi.middleware).concat(geminiApi.middleware),

})