import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import AddWalletModal from './AddWalletModal';
import Link from 'next/link';

export default function NavBar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/" className="flex">
          <p className="font-bold text-inherit">Wallet </p>
          <p className="font-bold text-inherit text-secondary">Watcher</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <AddWalletModal />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
