import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import NavBar from '../components/NavBar';
import { getUserSession } from '@/lib/queries/users';
import LoginForm from '@/components/LoginForm';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Explorers Spy',
  description: '',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getUserSession();

  return (
    <html lang="en" className="light bg-slate-200">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          {session ? children : <LoginForm className="mx-auto mt-10" />}
        </Providers>
      </body>
    </html>
  );
}
