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
import { handleToast } from '@/lib/toast';
import toast from 'react-hot-toast';

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
  const [state, formAction] = useFormState(
    async (_: any, formData: FormData) => {
      const toastId = toast.loading('Loading...');
      const response = await addAddressesSubmit(_, formData);
      handleToast({
        toastId,
        status: response?.status,
        statusText: response?.statusText,
        validStatus: 201,
      });
      return response;
    },
    { statusText: '', status: 0 }
  );

  useEffect(() => {
    if (state?.statusText === 'Created' && isOpen) {
      onClose();
    }
  }, [state?.statusText]);

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
                defaultValue={addressPreset ? addressPreset : ''}
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
