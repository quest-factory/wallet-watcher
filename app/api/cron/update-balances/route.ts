import { getResendEmails, usersToNotify } from '@/lib/email';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const supabase = createClient(cookies());
  const { data, error, status } = await supabase
    .from('addresses')
    .select(
      `
      name,
      address, 
      balance,
      id,
      user_id (
        email
      )`
    )
    .eq('alert_enabled', true);

  if (error)
    return new Response(`Supabase error: ${error.message}`, {
      status,
    });

  if (!data)
    return Response.json({ message: 'Supabase: no data', status: 400 });

  // Format address object
  // @ts-ignore
  const users = await usersToNotify(data, supabase);

  if (!users)
    return Response.json({
      message: 'Supabase: no users to notify',
      status: 400,
    });

  // Create Resend email objects
  const resendEmails = getResendEmails(users);
  const { error: resendError } = await resend.batch.send(resendEmails);

  if (resendError)
    return new Response(`Resend error: ${resendError.message}`, {
      status,
    });

  return Response.json({ message: 'Success', status: 200 });
}
