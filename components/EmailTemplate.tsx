import BigNumber from 'bignumber.js';

export type EmailTemplateProps = {
  accounts: {
    address: string;
    name: string;
    balance: number;
    prev_balance: number;
  }[];
};

export default function EmailTemplate({ accounts }: EmailTemplateProps) {
  const diff = (a: number, b: number) =>
    new BigNumber(a).minus(new BigNumber(b)).toFixed();

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Daily summary</h1>

      <p style={{ marginBottom: '20px' }}>
        Some of the accounts you are monitoring have had their balance changed.
      </p>

      <ul>
        {accounts &&
          accounts.map(({ address, name, balance, prev_balance }, idx) => (
            <li key={idx}>
              <a
                href={`https://wallet-watcher-topaz.vercel.app/wallet-details/${address}`}
                style={{ fontWeight: 700 }}
              >
                {name}:{' '}
              </a>
              <span>
                {balance - prev_balance > 0 ? (
                  <span>+{diff(balance, prev_balance)}</span>
                ) : (
                  <span>{diff(balance, prev_balance)}</span>
                )}{' '}
                eth
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
