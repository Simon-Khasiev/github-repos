import { createSlice } from "@reduxjs/toolkit";

export const userReposSlice = createSlice({
    name: 'userRepos',
    initialState: {
        repos: []
    },

    reducers: {
        setRepos: (state, { payload }) => {
            state.repos = payload
        },
    }
})

export const { setRepos } = userReposSlice.actions;

export default userReposSlice.reducer
