'use client'

import type { FormEvent } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { addDoc, collection, getFirestore, Timestamp } from 'firebase/firestore'
import { UserAuth } from '../../context/AuthContext'
import type { Account } from '../../context/AccountFormContext'
import { AccountForm } from '../../context/AccountFormContext'
import DashboardHeader from '../../components/DashboardHeader'
import { useToast } from '@/components/ui/useToast'
import FormPanel from '@/components/FormPanel'

export default function Create() {
  const { status, value, setStatus, setValue, owner, setOwner } = AccountForm()
  const { toast } = useToast()
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
    if (!user) {
      router.push('/')
    }
    if (owner.status === 'add') {
      toast({
        title: 'Cadastre suas credenciais primeiro!',
        description: 'Você não pode criar um QRCODE sem registrar seus dados',
        variant: 'destructive',
      })
      router.push('/dashboard')
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
        clientName: data.status.clientName,
        value: data.value,
        photoURL: user?.photoURL,
        id: user?.uid,
        timestamp: Timestamp.fromDate(new Date()),
      })
      toast({
        title: 'QRCODE criado com sucesso! 🎉 🥳',
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
        <div className="flex flex-col w-[800px] h-[400px] items-center justify-center border border-gray-300 rounded-2xl md:mt-16 md:px-32 md:w-200">
          <Text align="center" mt="5" size="6" weight="bold">
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
