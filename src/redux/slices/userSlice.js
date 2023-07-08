import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: null,
        token: null
    },

    reducers: {
        setUser: (state, { payload }) => {
            state.token = payload.token
            state.username = payload.username
        },
        deleteUser: (state) => {
            state.token = null
            state.username = null
        }
    }
})

export const { setUser, deleteUser} = userSlice.actions;

export default userSlice.reducer
