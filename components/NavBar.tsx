import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import AddWalletModal from './AddWalletModal';

export default function NavBar() {
  return (
    <Navbar classNames={{ wrapper: 'max-w-none' }} isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">Wallet Watcher</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <AddWalletModal />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
