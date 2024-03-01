'use client';

import { signOutUser } from '@/actions/users';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from '@nextui-org/react';

export default function UserDropdown({ email }: { email?: string }) {
  return (
    <Dropdown>
      <DropdownTrigger className="cursor-pointer hover:opacity-75">
        <Avatar
          className="capitalize"
          name={email}
          color="secondary"
          size="md"
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">
          <form action={signOutUser}>
            <button type="submit">Sign out</button>
          </form>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
