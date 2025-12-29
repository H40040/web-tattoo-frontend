import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'InkManage - Plataforma para Estúdios de Tatuagem',
  description: 'Crie seu site profissional, gerencie agendamentos e orçamentos em um só lugar.',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8B5CF6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans bg-saas-dark-bg text-saas-text-primary`}>
        {children}
      </body>
    </html>
  )
}
