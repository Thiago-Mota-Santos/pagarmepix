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
        url: 'https://cdn.discordapp.com/attachments/859483678082072616/1183574072752353340/image.png?ex=6588d440&is=65765f40&hm=c07bca4903b26645cdf7a908721815ff6026fcc0e78957c9a2b071882b444154&',
        width: 1200,
        height: 630,
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
