import { Link, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { getUser } from '@/lib/queries/users';
import UserDropdown from './UserDropdown';

export default async function NavBar() {
  const user = await getUser();

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/" className="flex">
          <p className="font-bold text-inherit !text-black">Explorers </p>
          <p className="font-bold text-inherit text-secondary">Spy</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        {user?.email ? (
          <UserDropdown email={user?.email} />
        ) : (
          <Link href="/">Log in</Link>
        )}
      </NavbarContent>
    </Navbar>
  );
}
