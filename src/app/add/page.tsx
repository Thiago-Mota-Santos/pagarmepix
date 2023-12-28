'use client'

import { Button, Flex, Text } from '@radix-ui/themes'
import { Form, FormSubmit } from '@radix-ui/react-form'
import { ContentForm } from '@/components/form'
import { AccountForm } from '@/context/AccountFormContext'
import { ChangeEvent, FormEvent } from 'react'
import { UserAuth } from '@/context/AuthContext'
import DashboardHeader from '@/components/DashboardHeader'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/useToast'

export default function Add() {
  const { owner, setOwner } = AccountForm()
  const { user, logOut } = UserAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleLogOut = () => {
    try {
      logOut()
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setOwner((prevStatus) => ({
      ...prevStatus,
      status: 'update',
      [name]: value,
    }))
  }

  if (!user) {
    return null
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(owner)
    // TODO: setDoc
    // TODO: loading statement
    try {
      setDoc(doc(db, 'owner', user.uid), {
        name: owner.name,
        city: owner.city,
        pixKey: owner.pixKey,
        owner: owner.status,
      })
      toast({
        title: 'Credenciais salvas 🎉 🥳',
        description: 'Agora você pode criar seu QRCODE!',
      })
      router.push('/dashboard')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="bg-primary-50 w-full min-h-screen md:pb-10">
      <DashboardHeader handleLogOut={handleLogOut} user={user} />
      <div className="flex flex-col items-center justify-center md:items-start md:flex-row gap-8 md:px-40 pb-40 md:pb-30">
        <div className="flex flex-col w-[800px] h-[500px] border border-gray-300 rounded-2xl md:mt-16 md:p-32">
          <Text align="center" mt="4" size="6" weight="bold">
            Cadastre suas credenciais
          </Text>
          <Flex className="flex items-center justify-center h-screen">
            <Form onSubmit={handleSubmit}>
              <ContentForm.Field name="name">
                <ContentForm.Label>Seu nome</ContentForm.Label>
                <ContentForm.ErrorMessage match="valueMissing">
                  Por favor insira seu nome
                </ContentForm.ErrorMessage>
                <ContentForm.InputField
                  name="name"
                  value={owner.name}
                  onChange={handleChange}
                  required
                />
              </ContentForm.Field>
              <ContentForm.Field name="pixKey">
                <ContentForm.Label>Chave pix</ContentForm.Label>
                <ContentForm.ErrorMessage match="tooShort">
                  Uma chave PIX deve ter no mínimo 11 caracteres.
                </ContentForm.ErrorMessage>
                <ContentForm.InputField
                  minLength={11}
                  placeholder="Utilize sua chave Pix (CPF, aleatória, email) "
                  name="pixKey"
                  value={owner.pixKey}
                  onChange={handleChange}
                  required
                />
              </ContentForm.Field>
              <ContentForm.Field name="city">
                <ContentForm.Label>Cidade</ContentForm.Label>
                <ContentForm.ErrorMessage match="valueMissing">
                  Por favor insira sua cidade
                </ContentForm.ErrorMessage>
                <ContentForm.InputField
                  name="city"
                  value={owner.city}
                  onChange={handleChange}
                  required
                />
              </ContentForm.Field>
              <FormSubmit asChild>
                <Button
                  className="bg-gray-700 h-9 px-4 py-2 shadow hover:bg-primary/90"
                  type="submit"
                >
                  Cadastrar usuário
                </Button>
              </FormSubmit>
            </Form>
          </Flex>
        </div>
      </div>
    </div>
  )
}
