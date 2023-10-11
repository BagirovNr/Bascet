import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'




export const fetchFavorits = createAsyncThunk(

    'favorits/fetchFavorits',
    async () => {
        const res = await fetch(' http://localhost:3000/favorites')
        const data = await res.json();
        return data;
    }
)



export const favoritsSlice = createSlice({
    name: 'favorits',
    initialState: {
        products: [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },


    },
    extraReducers: (builder) => {

        builder.addCase(fetchFavorits.fulfilled, (state, action) => {
            state.products = action.payload
        })

    },
})

export default favoritsSlice.reducer