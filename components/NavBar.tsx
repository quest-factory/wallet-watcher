import {
  Avatar,
  Button,
  Chip,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import AddWalletModal from './AddWalletModal';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export default async function NavBar() {
  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log('session : ', session?.user.email);

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/" className="flex">
          <p className="font-bold text-inherit">Explorers </p>
          <p className="font-bold text-inherit text-secondary">Spy</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        {session?.user.email ? (
          <>
            <NavbarItem>
              <AddWalletModal />
            </NavbarItem>
            <NavbarItem className="flex justify-end items-center gap-3">
              <div className="flex flex-col justify-center items-end text-xs gap-1">
                <p className="font-bold">{session?.user.email}</p>
                <Button className="h-4 text-xs">Disconnect</Button>
              </div>
              <Avatar name={session?.user.email} color="secondary" />
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>Not connected</NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
