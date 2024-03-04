import EthereumIcon from '@/components/icons/EthereumIcon';
import { Snippet, Spinner } from '@nextui-org/react';

export default function BalanceSnippetSkeleton() {
  return (
    <>
      <p className="font-bold">Balance</p>
      <Snippet
        hideSymbol
        hideCopyButton
        variant="bordered"
        className="bg-white h-12"
      >
        <div className="flex justify-center items-center gap-1 text-gray-600">
          <EthereumIcon className="h-4 w-4" />
          <Spinner size="sm" color="default" />
        </div>
      </Snippet>
    </>
  );
}
