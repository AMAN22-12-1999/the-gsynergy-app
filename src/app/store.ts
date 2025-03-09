import { configureStore } from '@reduxjs/toolkit'
import storesReducer from '../features/stores/storesSlice'
import skusReducer from '../features/skus/skusSlice'
import planningReducer from '../features/planning/planningSlice'
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    stores: storesReducer,
    skus: skusReducer,
    planning: planningReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
