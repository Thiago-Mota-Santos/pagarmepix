'use client'
import { Box, Button, Card, Text } from '@radix-ui/themes'
import { FileTextIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PIX } from 'gpix/dist'

export default function QrCode() {
  const router = useRouter()

  const handleRedirect = () => {
    router.push('/dashboard')
  }

  const pix = PIX.static()
    .setReceiverName('Thiago Mota dos Santos')
    .setReceiverCity('Campinas')
    .setKey('fcba8826-cbff-46e2-8c40-1b39896402a8')
    .setDescription('Donation with defined amount - GPIX') // optional
    .isUniqueTransaction(true)
    .setAmount(5.0)

  const value = 'R$ 16.50'
  const desc =
    'long description about the product description about the product'
  return (
    <div className="flex items-center justify-center h-screen">
      <Box className="flex items-center justify-center flex-col max-w-2xl w-[440px] h-[660px] border border-gray-400 rounded-3xl">
        <Image alt="wallet icon" height="64" src="wallet.svg" width="64" />
        <Box className="mt-2 max-w-sm">
          <div className="flex justify-between">
            <Text weight="bold">VALOR TOTAL</Text>
            <Text as="span">{value}</Text>
          </div>
          <Text weight="bold">DESCRIÇÃO </Text>
          <Text as="span" className="block max-w-lg truncate">
            {desc}
          </Text>
        </Box>

        <Card mt="4" size="4">
          <Image
            alt="QRCODE"
            height={300}
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pix.getBRCode()}`}
            width={300}
          />
        </Card>
        <Button
          className="hover:cursor-pointer"
          color="purple"
          mt="5"
          onClick={handleRedirect}
          radius="large"
        >
          Crie outro QRCODE
        </Button>
        <Button
          className="hover:cursor-pointer"
          color="gray"
          mt="5"
          radius="large"
        >
          <FileTextIcon /> Imprimir
        </Button>
      </Box>
    </div>
  )
}
