import { Link, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { getUserSession } from '@/lib/queries/users';
import UserDropdown from './UserDropdown';

export default async function NavBar() {
  const session = await getUserSession();

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
          <UserDropdown email={session?.user.email} />
        ) : (
          <Link href="/">Log in</Link>
        )}
      </NavbarContent>
    </Navbar>
  );
}
