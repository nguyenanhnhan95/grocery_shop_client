"use client"

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { makeStore } from '@/setting/store'
import NotificationModal from '@/components/composite/modal/NotificationModal'
import React, { Suspense } from 'react'
import LoadingPage from '@/components/loading/LoadingPage'
import LoadingBarTop from '@/components/layout/LoadingBarTop'
import ThemeScreen from './ThemeScreen'


export default function StoreProvider({ children }: { children: React.ReactNode }) {
  
  return (
    <Provider store={makeStore()}>
      <ThemeScreen>
        <LoadingBarTop />
        <Suspense fallback={<LoadingPage />} >
          {children}
        </Suspense>
        <NotificationModal />
        <ToastContainer />
      </ThemeScreen>
    </Provider>
  )
}