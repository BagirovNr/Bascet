import { configureStore } from '@reduxjs/toolkit'
import contentSlice from './contentSlice'

export const Store = configureStore({
    reducer: {
        favorits: contentSlice,
    },
})