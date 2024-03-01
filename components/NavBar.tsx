import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import AddWalletModal from './AddWalletModal';
import Link from 'next/link';
import { getSession, signOutUser } from '@/actions/users';

export default async function NavBar() {
  const session = await getSession();

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
                <form action={signOutUser}>
                  <Button className="h-4 text-xs" type="submit">
                    Disconnect
                  </Button>
                </form>
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
