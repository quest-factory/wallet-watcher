'use client';

import { useEffect, useState } from 'react';

const LOCAL_STORAGE_NAME = 'wallet_watcher_data';

interface Wallet {
  name: string;
  address: string;
}

const useLocalStorage = () => {
  const [walletsLocal, setWalletsLocal] = useState<Wallet[]>([]);

  useEffect(() => {
    getWalletsLocal();
  }, []);

  // add a wallet in local storage
  const writeWalletLocal = (walletName: string, walletAddress: string) => {
    if (!walletName || !walletAddress) { return }
    if (typeof window !== 'undefined') {
      const storedWalletsString = localStorage.getItem(LOCAL_STORAGE_NAME);

      const storedWalletArray = storedWalletsString
        ? JSON.parse(storedWalletsString)
        : [];

      const walletData = {
        name: walletName,
        address: walletAddress,
      };

      storedWalletArray.push(walletData);

      localStorage.setItem(
        LOCAL_STORAGE_NAME,
        JSON.stringify(storedWalletArray)
      );

      console.log('Add in local storage : ', walletName, walletAddress);
    }
  };

  // get wallets in local storage
  const getWalletsLocal = () => {
    if (typeof window !== 'undefined') {
      const storedWalletsString = localStorage.getItem(LOCAL_STORAGE_NAME);
      const storedWalletArray = storedWalletsString
        ? JSON.parse(storedWalletsString)
        : [];

      console.log('Local storage wallets : ', storedWalletArray);
      setWalletsLocal(storedWalletArray);
    }
  };

  return { writeWalletLocal, walletsLocal };
};

export default useLocalStorage;
