import reposReducer from './slices/userReposSlice'
import { configureStore } from '@reduxjs/toolkit'
import oneRepoReducer from'./slices/oneRepoSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: { 
        user: userReducer,
        userRepos: reposReducer,
        repo: oneRepoReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
})
