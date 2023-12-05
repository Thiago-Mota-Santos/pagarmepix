"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { UserAuth } from "./context/AuthContext";
import Link from "next/link"
import { cn } from "./utils/cn";
import { buttonVariants } from "./components/ui/Button";
import { Button, Separator, Text } from "@radix-ui/themes"
import Image from "next/image";
import { Input } from "./components/ui/Input";
import GoogleIcon from "./components/GoogleIcon";
import { Icons } from "./components/Icons";

export default function Page() {
  const { user, googleSignIn } = UserAuth();
  const [isloading, setIsLoading] = useState(false)
  const router = useRouter();
  React.useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [router, user]);
  const handleSignIn = () => {
    try {
      setIsLoading(true)
      googleSignIn();
    } catch (error) {
      setIsLoading(false)
      console.error(error);
    }
  };

  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
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
              <p className="text-gray-500 mt-4">
               entre com sua conta Google.
              </p>
            </div>
            
            <Input name="email" placeholder="email" />
            <Input name="password" placeholder="password" />
            <Button className="bg-gray-800 hover:bg-gray-900 transition-all">
              {isloading ?(
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
              ) :

              null
              }
              Entrar
            </Button>
            <div className="flex items-center justify-center">
            <Separator size="3"/>
            <Text as="span" size="2" color="gray" className=" inline bg-background px-2 text-muted-foreground">OU CONTINUE COM</Text>
            <Separator size="3" />
            </div>

            
            <button disabled={isloading}
              onClick={handleSignIn}
              className="flex items-center justify-center px-6 py-3 mt-4 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 hover:bg-gray-50 w-full">
              {isloading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
              
              )
            : <Icons.google className="mr-2 h-4 w-4" />
            }
              <span className="mx-2">Login com o Google</span>
            </button>
            <p className="text-primary-400 mt-4">Termos e Condições</p>
          </div>
        </div>
      </div>
    </>
  );
}
