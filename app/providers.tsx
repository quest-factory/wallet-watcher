'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { FC, ReactNode, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SupabaseProvider>
  );
}

const SupabaseProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [supabaseClient] = useState(() => createClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};
