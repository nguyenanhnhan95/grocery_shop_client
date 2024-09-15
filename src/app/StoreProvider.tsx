"use client"

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import ScreenTheme from './ScreenTheme'
import { makeStore } from '@/setting/store'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/lib/persistStore'


export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const persistor = persistStore(makeStore())
  return (
    <Provider store={makeStore()}>
      <PersistGate loading={null} persistor={persistor}>
        <ScreenTheme>
          {children}
        </ScreenTheme>
      </PersistGate>
      <ToastContainer />
    </Provider>
  )
}