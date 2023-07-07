import './globals.css';
import { Inter } from 'next/font/google';
import Providers from './providers/providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NPComplete',
  description: 'National Parks exploration page',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  )
}
