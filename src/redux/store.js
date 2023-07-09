import currentBranchReducer from './slices/currentBranchSlice'
import branchesReducer from './slices/branchesSlice'
import reposReducer from './slices/userReposSlice'
import { configureStore } from '@reduxjs/toolkit'
import oneRepoReducer from'./slices/oneRepoSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: { 
        user: userReducer,
        userRepos: reposReducer,
        repo: oneRepoReducer,
        branches: branchesReducer,
        curBranch: currentBranchReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
})
