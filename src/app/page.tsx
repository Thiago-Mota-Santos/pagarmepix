'use client'

import { Button } from '@/components/ui/Button'
import { UserAuth } from '@/context/AuthContext'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Avatar } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()
  const { user, logOut } = UserAuth()

  const handleLogOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = () => {
    router.push('/login')
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <header className="w-full h-4 md:px-64 flex justify-between items-center mt-16 bg-[#ffffff] ">
        <div className="flex items-center space-x-2 ml-4">
          <Image
            src="./pix-hand.svg"
            alt="pix-logo"
            width={80}
            height={80}
            className="ml-auto"
          />
        </div>

        {!user ? (
          <a
            className="py-2 mr-2 px-4 text-white bg-gray-950 normal-case rounded hover:scale-110"
            href="/login"
          >
            Entrar
          </a>
        ) : (
          <div className="flex gap-4">
            <Avatar
              src={user.photoURL || ''}
              alt="profile"
              width={60}
              height={60}
              className="rounded-full cursor-pointer"
              fallback={'D'}
            />
            <button onClick={handleLogOut}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right-from-line"
              >
                <path d="M3 5v14" />
                <path d="M21 12H7" />
                <path d="m15 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </header>
      <section className="flex flex-col mt-16 md:flex-row items-center justify-center h-full px-4 md:px-6 md:ml-16 md:mb-24 md:mt-0">
        <div className="md:flex-1 text-center space-y-4 md:text-left">
          <h2 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            Seja bem vindo ao Pagarmepix
          </h2>
          <h3 className="text-xl text-gray-500">
            A solução baseada em PIX para o seu
            <span className="text-gray-950 ml-1">comércio</span>
          </h3>
          <Button
            onClick={handleClick}
            variant="outline"
            className="hover:cursor-pointer"
          >
            Veja mais
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="md:flex-1 flex flex-col items-center justify-center">
          <Image
            alt="SVG Placeholder"
            className="object-contain object-center"
            height="500"
            src="/home.svg"
            width="500"
          />
        </div>
      </section>
    </div>
  )
}
