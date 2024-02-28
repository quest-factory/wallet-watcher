'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Card, CardHeader, Divider, CardBody } from '@nextui-org/react';

export default function LoginForm({ className = '' }: { className?: string }) {
  const supabaseClient = useSupabaseClient();

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
