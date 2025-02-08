import { configureStore } from '@reduxjs/toolkit'
import { cryptoApi } from '../services/cryptoAPI'
import { cryptoMainApi } from '../services/cryptoMainApi'
import {geminiApi} from "../services/geminiAPI"
import {geminiUrlApi} from "../services/geminiUrlApi"
import {cryptoNewsApi} from "../services/cryptoNewsApi";


export  const store=configureStore({
  reducer: {
    [cryptoApi.reducerPath]:cryptoApi.reducer,
    [cryptoMainApi.reducerPath]:cryptoMainApi.reducer,
    [geminiApi.reducerPath]:geminiApi.reducer,
    [geminiUrlApi.reducerPath]:geminiUrlApi.reducer,
    [cryptoNewsApi.reducerPath]:cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware).concat(cryptoMainApi.middleware).concat(geminiApi.middleware).concat(geminiUrlApi.middleware).concat(cryptoNewsApi.middleware),

})