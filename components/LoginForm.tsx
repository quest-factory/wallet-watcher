'use client';

import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Card, CardHeader, Divider, CardBody } from '@nextui-org/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm({ className = '' }: { className?: string }) {
  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.refresh();
    }
  }, [session, router]);

  return (
    <Card className={`${className} max-w-[450px] p-5`}>
      <CardHeader className="flex gap-3">
        <h2 className="text-md">Welcome</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <Auth
          supabaseClient={supabaseClient}
          providers={[]}
          magicLink
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#7828C8',
                  brandAccent: '#7828C8',
                },
                radii: {
                  borderRadiusButton: '12px',
                  buttonBorderRadius: '12px',
                  inputBorderRadius: '12px',
                },
              },
            },
          }}
        />
      </CardBody>
    </Card>
  );
}
