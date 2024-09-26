// "use client"
import overPlayMenuMainSlice from '@/redux/slice/admin/overPlayMenu';
import { CurrentUserSlice, LOCAL_STORAGE_USER } from '@/redux/slice/common/currentUser';
import { loginFormSlice } from '@/redux/slice/login/login';
import { notificationModalSlice } from '@/redux/slice/common/notificationModal';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import { loadingBarTopSlice } from '@/redux/slice/common/loadingBarTop';
import { queryParameterSlice } from '@/redux/slice/common/queryParameter';
import { getAllCategoryMenus } from '@/redux/slice/common/productCategory';
import menMainSlice from '@/redux/slice/admin/sideMenu';
import { actionAdminSlice } from '@/redux/slice/admin/buttonSaveSlice';

// import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// const createNoopStorage = () => {
//   return {
//     getItem() {
//       return Promise.resolve(null);
//     },
//     setItem(_key: string, value: number) {
//       return Promise.resolve(value);
//     },
//     removeItem() {
//       return Promise.resolve();
//     },
//   };
// };
// const storage =
//   typeof window !== "undefined"
//     ? createWebStorage("local")
//     : createNoopStorage();

// const persistConfig = {
//   key: "currentUser",
//   storage: storage,
//   whitelist: ['screenMode'],
// }
// const persistedReducer = persistReducer(persistConfig, CurrentUserSlice.reducer)
const rootReducer = combineReducers({
  sidebarMenu:menMainSlice.reducer,
  currentUser: CurrentUserSlice.reducer,
  login: loginFormSlice.reducer,
  notificationModal: notificationModalSlice.reducer,
  overPlayMenuMain: overPlayMenuMainSlice.reducer,
  loadingBarTop: loadingBarTopSlice.reducer,
  queryParameter: queryParameterSlice.reducer,
  productCategoryMenus: getAllCategoryMenus.reducer,
  actionAdmin:actionAdminSlice.reducer
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']