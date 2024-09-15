'use client';
import overPlayMenuMainSlice from '@/redux/slice/admin/overPlayMenu';
import { CurrentUserSlice, LOCAL_STORAGE_USER } from '@/redux/slice/common/currentUser';
import { loginFormSlice } from '@/redux/slice/login/login';
import { notificationModalSlice } from '@/redux/slice/common/notificationModal';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { loadingBarTopSlice } from '@/redux/slice/common/loadingBarTop';
import { queryParameterSlice } from '@/redux/slice/common/queryParameter';
import { getAllCategoryMenus } from '@/redux/slice/common/productCategory';
const persistConfig = {
  key:'root',
  storage,
  whitelist: [LOCAL_STORAGE_USER],
  transforms: [
    {
      in: (state: any) => ({
        authenticate: state.authenticate,
        screenMode: state.screenMode,
        user:state.user
      }), 
      out: (state: any) => state, 
    },
  ]
}
const persistedReducer = persistReducer(persistConfig,  CurrentUserSlice.reducer) 
const rootReducer = combineReducers({
  currentUser: persistedReducer,
  login: loginFormSlice.reducer,
  notificationModal: notificationModalSlice.reducer,
  overPlayMenuMain:overPlayMenuMainSlice.reducer,
  loadingBarTop:loadingBarTopSlice.reducer,
  queryParameter:queryParameterSlice.reducer,
  productCategoryMenus:getAllCategoryMenus.reducer
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']