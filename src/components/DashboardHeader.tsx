import { Avatar, Box, Flex, Text } from '@radix-ui/themes'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from '@radix-ui/react-menubar'
import { AvatarIcon, ArrowLeftIcon } from '@radix-ui/react-icons'
import { User } from 'firebase/auth'

interface HeaderProps {
  handleLogOut: () => void
  user: User
}

export default function DashboardHeader({ handleLogOut, user }: HeaderProps) {
  const handleProfile = () => {
    console.log('profile')
  }

  return (
    <Box className="flex items-center p-2 mr-2 justify-end">
      <Flex align="center">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="py-1 transition-all">
              <Flex>
                <Avatar
                  radius="full"
                  fallback="D"
                  size="3"
                  src={user.photoURL || ''}
                />
                <Flex
                  align="start"
                  direction="column"
                  className="ml-1 hidden md:flex"
                >
                  <Text size="2" className="hidden md:flex">
                    {user.displayName}
                  </Text>
                  <Text size="2" color="gray">
                    Admin
                  </Text>
                </Flex>
              </Flex>
            </MenubarTrigger>
            <MenubarContent
              sideOffset={5}
              className="bg-white min-w-[120px] p-1.5 border shadow-custom rounded-lg border-gray-200"
            >
              <MenubarItem onClick={handleProfile}>
                <Text as="span" className="flex items-center justify-center">
                  <AvatarIcon fontSize={5} />
                  <Text className="ml-1 hover:cursor-pointer">Profile</Text>
                </Text>
              </MenubarItem>
              <MenubarSeparator className="border-b-[1px]" />
              <MenubarItem onClick={handleLogOut}>
                <Text as="span" className="flex items-center justify-center">
                  <ArrowLeftIcon fontSize={5} />
                  <Text className="ml-1 hover:cursor-pointer">Sign out</Text>
                </Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Flex>
    </Box>
  )
}
