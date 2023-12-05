import { Button, Flex } from '@radix-ui/themes'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
} from '@radix-ui/react-form'
import type { ChangeEvent, FormEvent } from 'react'
import { useEffect } from 'react'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
// import { z } from "zod";
import { AccountForm, type Account } from '../context/AccountFormContext'
import { Input } from './ui/Input'
import { Textarea } from './ui/TextArea'
import { currencyFormat } from '../utils/currencyFormat'

// TODO: add zod to verify fields
// const formSchema = z.object({
//   username: z.string().min(1),
//   pixKey: z.string().min(32),
//   value: z,
// });

interface FormInterface {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  data: Account
  userId?: string
}

export default function FormPanel({
  handleSubmit,
  data,
  userId,
}: FormInterface) {
  const db = getFirestore()
  const usersCollection = collection(db, 'users')

  const { status, value, setStatus, setValue } = AccountForm()

  useEffect(() => {
    const q = query(usersCollection, where('id', '==', userId))
    getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          /* empty */
        } else {
          querySnapshot.forEach((doc) => {
            data.setDescription(doc.data().description)
            data.setPixKey(doc.data().pixKey)
            data.setStatus(doc.data().clientNameMsg)
          })
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar usuário:', error)
      })
    getDocs
  }, [])

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = currencyFormat(e.target.value)
    setValue(formattedValue)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setStatus((prevStatus) => ({
      ...prevStatus,
      [name]: value,
    }))
    console.log(status)
  }

  return (
    <Form className="mt-10" onSubmit={handleSubmit}>
      <FormField className="grid mb-4" name="name">
        <Flex align="baseline" display="flex" justify="between">
          <FormLabel className="text-base font-medium text-black">
            Nome do cliente
          </FormLabel>
          <FormMessage className="text-red-700" match="valueMissing">
            Por favor insira o nome do cliente
          </FormMessage>
        </Flex>
        <FormControl asChild>
          <Input
            name="clientName"
            value={status.clientName}
            onChange={handleChange}
            required
          />
        </FormControl>
      </FormField>
      <FormField className="grid mb-4" name="qrcode">
        <Flex align="baseline" display="flex" justify="between">
          <FormLabel className="text-base font-medium text-black">
            Chave Pix
          </FormLabel>
          <FormMessage className="text-red-700" match="valueMissing">
            Por favor insira a chave pix
          </FormMessage>
        </Flex>
        <FormControl asChild>
          <Input
            value={status.pixKey}
            name="pixKey"
            onChange={handleChange}
            placeholder="Chave Pix"
            required
          />
        </FormControl>
      </FormField>
      <FormField className="grid mb-4" name="price">
        <Flex align="baseline" display="flex" justify="between">
          <FormLabel className="text-base font-medium text-black">
            Valor
          </FormLabel>
          <FormMessage className="text-red-700" match="valueMissing">
            Por favor insira um valor válido (em reais)
          </FormMessage>
        </Flex>
        <FormControl asChild>
          <Input
            name="value"
            value={value}
            onChange={handleChangeValue}
            placeholder="R$ 0,00"
            required
          />
        </FormControl>
      </FormField>
      <FormField className="grid mb-4" name="question">
        <Flex align="baseline" display="flex" justify="between">
          <FormLabel className="text-base font-medium text-black">
            Descrição
          </FormLabel>
        </Flex>
        <FormControl asChild>
          <Textarea
            value={status.description}
            className="resize-none"
            name="description"
            onChange={handleChange}
            placeholder="Insira uma descrição (opcional)"
          />
        </FormControl>
      </FormField>
      <FormSubmit asChild>
        <Button
          className="bg-violet-600 h-9 px-4 py-2 shadow hover:bg-primary/90"
          type="submit"
        >
          Criar QRCODE
        </Button>
      </FormSubmit>
    </Form>
  )
}
