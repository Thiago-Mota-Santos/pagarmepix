'use client'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import React, { useContext, useState } from 'react'

const AccountFormContext = React.createContext({} as Account)

export interface FormState {
  pixKey?: string
  description: ''
  clientNameStatus: 'success' | 'error' | 'none'
  clientName: string
}

export interface Owner {
  name?: string
  city?: string
  pixKey?: string
  id?: string
  status?: 'add' | 'update'
}

export interface Account {
  owner: Owner
  setOwner: Dispatch<SetStateAction<Owner>>
  status: FormState
  setStatus: Dispatch<SetStateAction<FormState>>
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

export function AccountFormProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState('')

  const [owner, setOwner] = useState<Owner>({
    name: '',
    city: '',
    pixKey: '',
    id: '',
    status: 'add',
  })
  const [status, setStatus] = useState<FormState>({
    description: '',
    clientNameStatus: 'none',
    clientName: '',
  })

  return (
    <AccountFormContext.Provider
      value={{
        setStatus,
        status,
        value,
        setValue,
        owner,
        setOwner,
      }}
    >
      {children}
    </AccountFormContext.Provider>
  )
}

export function AccountForm() {
  return useContext(AccountFormContext)
}
