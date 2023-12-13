'use client'

import { Flex } from '@radix-ui/themes'
import { ContentCard } from '../../components/ContentCard'
import DashboardHeader from '../../components/DashboardHeader'
import { UserAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { user, logOut } = UserAuth()
  const router = useRouter()
  const handleLogOut = async () => {
    try {
      await logOut()
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  if (!user) return null

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
        <ContentCard />
      </Flex>
    </div>
  )
}
