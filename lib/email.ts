import { Database, Tables } from '@/types_db';
import { getBalance } from './infura';
import { SupabaseClient } from '@supabase/supabase-js';
import EmailTemplate, { EmailTemplateProps } from '@/components/EmailTemplate';

// --------------------------------------------
// -  CHECK, UPDATE BALANCE & BUILD toNotify
// --------------------------------------------
export type UserToNotify = {
  [email: string]: {
    [addr: string]: {
      name: string;
      balance: number;
      prev_balance: number;
    };
  };
};
export type UsersToNotifyParams = { user_id: { email: string } } & Omit<
  Tables<'addresses'>,
  'user_id'
>[];

export async function usersToNotify(
  users: UsersToNotifyParams,
  supabase: SupabaseClient<Database>
) {
  const usersToNotify: UserToNotify = {};

  for (const {
    address,
    balance,
    // @ts-ignore
    user_id: { email },
    id,
    name,
  } of users) {
    const res = await getBalance(address);

    if (res !== undefined && balance !== res && email) {
      usersToNotify[email] = {
        [address]: {
          name,
          balance: res,
          prev_balance: balance,
        },
        ...usersToNotify[email],
      };

      await supabase.from('addresses').update({ balance: res }).eq('id', id);
    }

    return usersToNotify;
  }
}

// --------------------------------------------
// -          CREATE RESEND OBJECT
// --------------------------------------------
export type ResendEmail = {
  from: string;
  to: string[];
  subject: string;
  react: JSX.Element;
};

export function getResendEmails(users: UserToNotify) {
  const emails: ResendEmail[] = [];

  Object.entries(users).forEach(([email, accounts]) => {
    const props: EmailTemplateProps = {
      accounts: Object.entries(accounts).map(
        ([address, { balance, name, prev_balance }]) => ({
          key: address,
          address,
          name,
          balance,
          prev_balance,
        })
      ),
    };

    emails.push({
      from: 'Explorers Spy <send@franck-fernandez.com>',
      to: [email],
      subject: 'Explorers Spy - Alert',
      react: EmailTemplate(props),
    });
  });

  return emails;
}
