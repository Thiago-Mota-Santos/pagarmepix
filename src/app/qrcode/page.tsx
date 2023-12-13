'use client'
import { Box, Button, Card, Flex, Text } from '@radix-ui/themes'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PIX } from 'gpix/dist'
import { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'
import { Skeleton } from '@/components/ui/Skelleton'
import { CopyIcon } from '@radix-ui/react-icons'
import { useToast } from '@/components/ui/useToast'

interface DataState {
  status?: string
  receiverName?: string
  receiverCity?: string
  pixKey?: string
  description?: string
  isUniqueTransaction?: boolean
  amount: string
  brcode?: string
}

export default function QrCode() {
  const { toast } = useToast()
  const [data, setData] = useState<DataState>({
    status: 'loading',
    receiverName: '',
    receiverCity: '',
    pixKey: '',
    description: '',
    isUniqueTransaction: true,
    amount: '',
  })
  // const [animation, setAnimation] = useState(false)
  const router = useRouter()
  const ownerCollection = collection(db, 'owner')
  const usersCollection = collection(db, 'users')

  const handleRedirect = () => {
    router.push('/dashboard')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownerQuerySnapshot = await getDocs(query(ownerCollection))
        const userQuerySnapshot = await getDocs(
          query(usersCollection, orderBy('timestamp', 'desc'), limit(1)),
        )

        let combinedData = { ...data }

        userQuerySnapshot.forEach((doc) => {
          combinedData = {
            ...combinedData,
            description: doc.data().description,
            amount: doc.data().value,
          }
          doc.data()
        })

        ownerQuerySnapshot.forEach((doc) => {
          combinedData = {
            ...combinedData,
            status: 'success',
            receiverName: doc.data().name,
            receiverCity: doc.data().city,
            pixKey: doc.data().pixKey,
          }
        })

        setData(combinedData)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
      getDocs(ownerCollection)
      getDocs(usersCollection)
    }
    fetchData()
  }, [])

  if (data.status === 'loading')
    return (
      <Flex display="flex" className="h-screen" align="center" justify="center">
        <Skeleton className="w-[400px] h-[400px]" />
      </Flex>
    )

  const pasteFromClipboard = () => {
    const brcode = pix.getBRCode()

    if (!brcode) return null

    navigator.clipboard
      .writeText(brcode)
      .then(() => {
        toast({
          title: 'QRCODE copiado com sucesso 🥳',
        })
      })
      .catch((err) => {
        console.error('Erro ao copiar texto para a área de transferência:', err)
      })
  }

  const value = data.amount
    .replace('R$', '')
    .trim()
    .replace(/\./g, '')
    .replace(',', '.')
  const valueFormatted = parseFloat(value)

  const pix = PIX.static()
    .setReceiverName(data.receiverName || '')
    .setReceiverCity(data.receiverCity || '')
    .setKey(data.pixKey || '')
    .setDescription(data.description || '')
    .isUniqueTransaction(data.isUniqueTransaction || true)
    .setAmount(valueFormatted)

  return (
    <div className="flex items-center justify-center h-screen">
      {data.status === 'success' ? (
        <Box className="flex items-center justify-center flex-col max-w-2xl w-[440px] h-[600px] border border-gray-400 rounded-3xl">
          <Image alt="wallet icon" height="64" src="pix-hand.svg" width="64" />
          <Box className="mt-2 max-w-sm">
            <div className="flex justify-between">
              <Text weight="bold">VALOR TOTAL</Text>
              <Text className="ml-48" as="span">
                {`${data.amount}` || ''}
              </Text>
            </div>
            <Text mt="1" weight="bold">
              DESCRIÇÃO
            </Text>
            <Text as="span" className="block max-w-lg truncate">
              {data.description || ''}
            </Text>
          </Box>

          <Card mt="4" size="3">
            <Image
              alt="QRCODE"
              height={250}
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pix.getBRCode()}`}
              width={250}
            />
          </Card>
          <Flex className="flex items-center justify-center flex-col">
            <Button
              mt="2"
              onClick={pasteFromClipboard}
              className="hover:cursor-pointer hover:text-blue-700 transition-all"
              variant="outline"
            >
              <CopyIcon className="h-4 w-4" />
              <Text as="span">Copy QR Code Link</Text>
            </Button>
            <Button
              className="bg-gray-900 hover:cursor-pointer hover:bg-gray-950 hover:transition-all"
              mt="2"
              onClick={handleRedirect}
              radius="large"
            >
              Crie outro QRCODE
            </Button>
          </Flex>
          {/* <Button
            disabled={true}
            className="hover:cursor-pointer"
            color="gray"
            mt="5"
            radius="large"
          >
            <FileTextIcon /> Imprimir
          </Button> */}
        </Box>
      ) : null}
    </div>
  )
}
