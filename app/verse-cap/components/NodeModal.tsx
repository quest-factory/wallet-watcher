'use client';

import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import NodeForm from './NodeForm';
import { ControlButton } from 'reactflow';
import CirclePlusIcon from '@/components/icons/CirclePlusIcon';
import { CompanyNode } from '@/flow/types';

export default function NodeModal({ nodes }: { nodes: CompanyNode[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <ControlButton onClick={onOpen}>
        <CirclePlusIcon />
      </ControlButton>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <ModalBody className="p-7">
            <NodeForm nodes={nodes} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
