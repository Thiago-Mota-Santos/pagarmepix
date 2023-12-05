'use client'

import type { FormEvent } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { UserAuth } from '../../context/AuthContext'
import FormPanel from '../../components/FormPanel'
import type { Account } from '../../context/AccountFormContext'
import { AccountForm } from '../../context/AccountFormContext'
import DashboardHeader from '../../components/DashboardHeader'

export default function Create() {
  const { status, value, setStatus, setValue, owner, setOwner } = AccountForm()

  const data: Account = {
    setStatus,
    status,
    setValue,
    value,
    owner,
    setOwner,
  }

  const { user, logOut } = UserAuth()

  const db = getFirestore()
  const usersCollection = collection(db, 'users')

  const router = useRouter()

  useEffect(() => {
    if (user) {
      console.log('logged!')
    } else if (user === null) {
      router.push('/')
    }
  }, [router, user])

  const handleLogOut = () => {
    try {
      logOut()
    } catch (error) {
      console.log(error)
    }
  }

  if (!user) {
    return null
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await addDoc(usersCollection, {
        description: data.status.description,
        pixKey: data.status.pixKey,
        clientName: data.status.clientName,
        value: data.value,
        photoURL: user?.photoURL,
        id: user?.uid,
      })
      router.push('/qrcode')
    } catch (error) {
      console.error('Something error occurred:', error)
    }
  }

  return (
    <div className="bg-primary-50 w-full min-h-screen md:pb-10">
      <DashboardHeader handleLogOut={handleLogOut} user={user} />
      <div className="flex flex-col items-center justify-center md:items-start md:flex-row gap-8 md:px-40 pb-40 md:pb-0">
        <div className="flex flex-col w-[800px] h-[500px] border border-gray-300 rounded-2xl md:mt-16 md:px-32">
          <Text align="center" mt="4" size="6" weight="bold">
            Crie um novo QRCODE
          </Text>
          <FormPanel
            data={data}
            handleSubmit={handleSubmit}
            userId={user?.uid}
          />
        </div>
      </div>
    </div>
  )
}
