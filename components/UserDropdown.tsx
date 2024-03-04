'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Chip,
} from '@nextui-org/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

export default function UserDropdown({ email }: { email?: string }) {
  const supabase = useSupabaseClient();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.refresh();
  }

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
        <DropdownItem key="mail" className="hover:!bg-white !cursor-auto">
          <Chip size="sm" className="font-semibold">
            {email}
          </Chip>
        </DropdownItem>
        <DropdownItem key="new" onPress={handleSignOut}>
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
