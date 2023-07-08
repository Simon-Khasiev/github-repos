import { createSlice } from "@reduxjs/toolkit";

export const oneReposSlice = createSlice({
    name: 'repo',
    initialState: { repo: null},

    reducers: {
        setRepo: (state, { payload }) => {
            state.repo = payload
        },
    }
})

export const { setRepo } = oneReposSlice.actions;

export default oneReposSlice.reducer
