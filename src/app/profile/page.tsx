'use client'

import { Button, Flex, Text } from '@radix-ui/themes'
import { AccountForm } from '@/context/AccountFormContext'
import { UserAuth } from '@/context/AuthContext'
import DashboardHeader from '@/components/DashboardHeader'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const { user, logOut } = UserAuth()
  const { owner } = AccountForm()
  const router = useRouter()

  const handleAddCredential = () => {
    router.push('/add')
  }

  if (!user) return null

  return (
    <div className="bg-primary-50 w-full min-h-screen md:pb-10">
      <DashboardHeader user={user} handleLogOut={logOut} />
      <div className="flex flex-col items-center justify-center md:items-start md:flex-row gap-8 md:px-40 pb-40 md:pb-0">
        <Flex
          width="auto"
          className="flex flex-col w-[600px] h-[500px] border border-gray-300 rounded-2xl md:mt-16 md:px-32 "
        >
          <Text align="center" mt="4" size="6" weight="bold">
            Meus dados
          </Text>
          {owner.pixKey === '' ? (
            <Flex
              direction="column"
              className="flex items-center justify-center h-screen"
              align="center"
            >
              <Text className="mb-4">
                Credenciais vazias, faça adição delas clicando abaixo
              </Text>
              <Button
                onClick={handleAddCredential}
                className="bg-gray-700 h-9 px-4 py-2 shadow hover:bg-primary/90"
                type="submit"
              >
                Cadastrar credenciais
              </Button>
            </Flex>
          ) : (
            <Flex
              direction="column"
              className="flex items-center justify-center h-screen"
              align="center"
            >
              <span>
                <Text weight="bold" align="center" mt="2" mr="2">
                  Nome:
                </Text>
                {owner.name}
              </span>
              <span>
                <Text weight="bold" align="center" mr="2">
                  Chave pix:
                </Text>
                {owner.pixKey}
              </span>
              <span>
                <Text weight="bold" align="center" mr="2">
                  Cidade:
                </Text>
                {owner.city}
              </span>
            </Flex>
          )}
        </Flex>
      </div>
    </div>
  )
}
