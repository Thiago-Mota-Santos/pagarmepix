'use client'

import { Flex } from '@radix-ui/themes'
import { ContentCard } from '../../components/ContentCard'
import DashboardHeader from '../../components/DashboardHeader'
import { UserAuth } from '@/context/AuthContext'

export default function Dashboard() {
  const { user, logOut } = UserAuth()

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
        <ContentCard add={true} />
        <ContentCard create={true} />
      </Flex>
    </div>
  )
}
