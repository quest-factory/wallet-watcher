import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';
import AddWalletModal from './AddWalletModal';

export default function NavBar({}: Readonly<{}>) {
  return (
    <Navbar className="shadow-lg">
      <NavbarBrand>
        <Link href="#">WALLET WATCHER</Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <AddWalletModal />

          {/* <Button as={Link} color="primary" href="#" variant="flat">
            Add wallet to watch
          </Button> */}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
