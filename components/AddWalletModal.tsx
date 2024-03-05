'use client';

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
import { addAddressesSubmit } from '@/actions/addresses';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';

interface AddWalletModalProps {
  addressPreset?: string;
  btnClassName?: string;
  customText?: string;
}

export default function AddWalletModal({
  addressPreset,
  btnClassName,
  customText,
}: AddWalletModalProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [state, formAction] = useFormState(addAddressesSubmit, { message: '' });

  useEffect(() => {
    if (state?.message === 'Created' && isOpen) {
      onClose();
    }
  }, [state?.message]);

  return (
    <>
      <Button onPress={onOpen} color="secondary" className={btnClassName}>
        {customText ? customText : 'Add wallet'}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <form action={formAction}>
            <ModalHeader className="flex flex-col gap-1">
              Add new wallet
            </ModalHeader>

            <ModalBody>
              <Input
                autoFocus
                label="Wallet name"
                name="name"
                variant="bordered"
              />
              <Input
                label="Wallet address"
                variant="bordered"
                name="address"
                value={addressPreset ? addressPreset : ''}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Submit />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button color="secondary" type="submit" disabled={pending}>
      {pending ? 'Adding...' : 'Add'}
    </Button>
  );
}
