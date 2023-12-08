'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Separator, Text } from '@radix-ui/themes'
import Image from 'next/image'
import { useToast } from '@/components/ui/useToast'
import { UserAuth } from '@/context/AuthContext'
import { Icons } from '@/components/Icons'

interface Loading {
  email?: boolean
  google?: boolean
}

export default function Login() {
  const { user, googleSignIn } = UserAuth()
  const [loading, setLoading] = useState<Loading>({
    email: false,
    google: false,
  })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [router, user])
  const handleSignIn = async () => {
    try {
      setLoading({
        google: true,
      })
      await googleSignIn()
      toast({
        title: 'Seja bem vindo 🎉🥳',
      })
    } catch (error) {
      setLoading({
        google: false,
      })
      toast({
        title: 'Algo deu errado :(',
        description: String(error),
        variant: 'destructive',
      })
      console.error(error)
    }
  }

  // const handleNormalLogin = async () => {
  //   try {
  //     setLoading({
  //       email: true,
  //     })
  //     await normalSignIn()
  //   } catch (error) {
  //     setLoading({
  //       email: false,
  //     })
  //     toast({
  //       title: 'Algo deu errado :(',
  //       description: String(error),
  //       variant: 'destructive',
  //     })
  //     console.error(error)
  //   }
  // }

  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-[url('/home.svg')] bg-auto p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 " />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <div className="flex justify-center mx-auto">
                <Image
                  src="/pix-hand.svg"
                  alt="logo pix em cima da mão"
                  width={70}
                  height={70}
                  priority
                />
              </div>
              <p className="mt-3 font-bold text-xl">
                Crie uma conta <br /> para o seu comércio
              </p>
              <p className="text-gray-500 mt-4">entre com sua conta Google.</p>
            </div>

            {/* TODO: add email/senha login */}

            {/* <Input
              name="email"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              name="password"
              value={password}
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)} 
            />
          */}
            {/* <Button
              disabled={loading.email}
              onClick={handleNormalLogin}
              className="bg-gray-800 hover:bg-gray-900 transition-all"
            >
              {loading.email ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Entrar
            </Button> */}
            <div className="flex items-center justify-center">
              <Separator size="3" />
              <Text
                as="span"
                size="2"
                color="gray"
                className=" inline bg-background px-2 text-muted-foreground"
              >
                OU CONTINUE COM
              </Text>
              <Separator size="3" />
            </div>

            <button
              disabled={loading.google}
              onClick={handleSignIn}
              className="flex items-center justify-center px-6 py-3 mt-4 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 hover:bg-gray-50 w-full"
            >
              {loading.google ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}
              <span className="mx-2">Login com o Google</span>
            </button>
            <p className="text-primary-400 mt-4">Termos e Condições</p>
          </div>
        </div>
      </div>
    </>
  )
}
