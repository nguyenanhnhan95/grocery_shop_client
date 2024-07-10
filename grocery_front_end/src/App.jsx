import { BrowserRouter, Route, Routes } from "react-router-dom";
import OAuth2RedirectHandle from "./components/oauth2/OAuth2RedirectHandler";
import { Suspense, lazy } from "react";
import BackdropLoading from "./utils/BackdropLoading";
import store from "./store/store";
import { getAllCategoryMenus } from "./slice/product/productCategoty";
import { loginForm } from "./slice/login/login";
import menuContentMainSlice from "./slice/main/menuContentMain";
import overPlayMenuMainSlice from "./slice/main/overPlayMenu";
import { actionAdminSlice } from "./slice/main/actionAdmin";
import LoadingWrapper from "./components/wrapper/InitialLoadingWrapper";
import { ErrorBoundary } from "react-error-boundary";
import ErrorSystem from "./pages/error/ErrorSystem";
import { actionReducerStore, reducerSliceKey } from "./constants/store/reducerSlice";
import InitialLoadingWrapper from "./components/wrapper/InitialLoadingWrapper";
const Home = lazy(() => import('./pages/home/Home').then((module) => {
  store.injectReducer(actionReducerStore.clear, '', '')
  store.injectReducer(actionReducerStore.add, reducerSliceKey.productCategoryMenus, getAllCategoryMenus.reducer)
  return module;
}))
const Login = lazy(() => import('./pages/login/Login').then((module) => {
  store.injectReducer(actionReducerStore.clear, '', '')
  store.injectReducer(actionReducerStore.add, reducerSliceKey.loginForm, loginForm.reducer)
  return module;
}))
const Admin = lazy(() => import('./pages/admin/Admin').then((module) => {
  store.injectReducer(actionReducerStore.clear, '')
  store.injectReducer(actionReducerStore.add, reducerSliceKey.menuContentMain, menuContentMainSlice.reducer)
  store.injectReducer(actionReducerStore.add, reducerSliceKey.overPlayMenuMain, overPlayMenuMainSlice.reducer)
  store.injectReducer(actionReducerStore.add, reducerSliceKey.actionAdmin, actionAdminSlice.reducer)
  return module;
}))
function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorSystem}>
      <InitialLoadingWrapper>
        <BrowserRouter>
          <Suspense fallback={<BackdropLoading />} >
            <Routes>
              <Route path={`/`} element={<Home />} />
              <Route path={`/login`} element={<Login />} />
              <Route path={'/oauth2/redirect'} element={<OAuth2RedirectHandle />} />
              <Route path={'/admin/*'} element={<Admin />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </InitialLoadingWrapper>
    </ErrorBoundary>
  );
}

export default App;
