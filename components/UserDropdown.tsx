'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function UserDropdown({ email }: { email?: string }) {
  const supabase = useSupabaseClient();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/');
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
        <DropdownItem key="new" onPress={handleSignOut}>
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
