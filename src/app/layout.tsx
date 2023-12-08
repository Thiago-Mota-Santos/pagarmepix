import '@radix-ui/themes/styles.css'

import '../globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Theme } from '@radix-ui/themes'
import { AccountFormProvider } from '../context/AccountFormContext'
import { AuthContextProvider } from '../context/AuthContext'
import { Metadata } from 'next'
import { Toaster } from '@/components/ui/Toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pagarmepix',
  description: 'A forma mais rápida de criar QRCODE pix',
  openGraph: {
    images: [
      {
        url: 'https://cdn.discordapp.com/attachments/859483678082072616/1182781589726429275/image.png?ex=6585f232&is=65737d32&hm=354412a2c6f8d103534b4904d0d293de89eb91c59fa7267b624b1af6833fe456&',
        width: 800,
        height: 600,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <AccountFormProvider>
            <Theme>
              {children}
              <Analytics />
              <Toaster />
            </Theme>
          </AccountFormProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
