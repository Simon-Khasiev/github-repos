import { createSlice } from "@reduxjs/toolkit";

export const curBranchSlice = createSlice({
    name: 'branch',
    initialState: { tree: [], url: '' },

    reducers: {
        setTree: (state, { payload }) => {
            state.tree = [...state.tree, ...payload]
        },
        deleteTree: (state) => {state.tree = []},
        setBranchUrl: (state, { payload }) => {
            state.url = payload
        },
    }
})

export const { setTree, setBranchUrl, deleteTree } = curBranchSlice.actions;

export default curBranchSlice.reducer
