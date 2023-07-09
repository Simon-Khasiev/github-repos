import { createSlice } from "@reduxjs/toolkit";

export const branchesSlice = createSlice({
    name: 'branches',
    initialState: { branches: [] },

    reducers: {
        setBranches: (state, { payload }) => {
            state.branches = payload
        },
    }
})

export const { setBranches } = branchesSlice.actions;

export default branchesSlice.reducer
