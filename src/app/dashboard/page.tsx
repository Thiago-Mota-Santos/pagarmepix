'use client'

import { Flex } from '@radix-ui/themes'
import { ContentCard } from '../../components/ContentCard'
import DashboardHeader from '../../components/DashboardHeader'
import { UserAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import { AccountForm } from '@/context/AccountFormContext'

export default function Dashboard() {
  const { user, logOut } = UserAuth()
  const { owner, setOwner } = AccountForm()
  const ownerCollection = collection(db, 'owner')

  if (!user) {
    return null
  }

  const handleLogOut = () => {
    try {
      logOut()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const q = query(ownerCollection, where('owner', '==', 'update'))
    getDocs(q).then((QuerySnapshot) => {
      QuerySnapshot.forEach((doc) => {
        setOwner({
          status: doc.data().owner,
        })
      })
    })
  }, [])

  return (
    <div className="h-screen">
      <DashboardHeader handleLogOut={handleLogOut} user={user} />
      <Flex
        className="flex-col md:flex-row"
        gap="8"
        mt="8"
        display="flex"
        align="center"
        justify="center"
      >
        <ContentCard status={owner.status ? owner.status : 'add'} />
      </Flex>
    </div>
  )
}