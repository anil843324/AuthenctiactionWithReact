import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../service/userAuthApi'
import userReducer from '../features/userSlice'
import authReducer from '../features/authSlice'
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    user:userReducer,
    auth:authReducer,

  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
})


setupListeners(store.dispatch)