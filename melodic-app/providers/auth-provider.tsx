'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { createUserStore, UserStoreType } from '@/stores/userStore'


export type UserStoreApi = ReturnType<typeof createUserStore>

export const AuthContext = createContext<UserStoreApi | undefined>(
  undefined,
)

export interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const storeRef = useRef<UserStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createUserStore()
  }

  return (
    <AuthContext.Provider value={storeRef.current}>
      {children}
    </AuthContext.Provider>
  )
}

export const useUserStore = <T,>(
  selector: (store: UserStoreType) => T,
): T => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error(`useUserStore must be used within AuthProvider`)
  }

  return useStore(authContext, selector)
}
