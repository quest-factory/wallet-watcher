'use client';

import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
import useLocalStorage from '@/lib/useLocalStorage';

export default function AddWalletModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [walletName, setWalletName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const { writeWalletLocal } = useLocalStorage();

  const onSubmit = (onClose: () => void) => {
    writeWalletLocal(walletName, walletAddress);
    location.reload();
    onClose();
  };

  return (
    <>
      <Button onPress={onOpen} color="secondary">
        Add wallet to watch
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new wallet
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Wallet name"
                  variant="bordered"
                  onChange={(e) => setWalletName(e.target.value)}
                />
                <Input
                  label="Wallet address"
                  variant="bordered"
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="secondary"
                  isDisabled={!walletAddress || !walletName}
                  onPress={() => onSubmit(onClose)}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
