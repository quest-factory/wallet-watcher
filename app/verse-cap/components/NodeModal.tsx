'use client';

import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import NodeForm from './NodeForm';
import { ControlButton, Edge, Node } from 'reactflow';
import CirclePlusIcon from '@/components/icons/CirclePlusIcon';
import { Company, CompanyNode } from '@/flow/types';
import { Dispatch, SetStateAction } from 'react';

export default function NodeModal({
  nodes,
  setNodes,
  setEdges,
}: {
  nodes: CompanyNode[];
  setNodes: Dispatch<SetStateAction<Node<Company, string | undefined>[]>>;
  setEdges: Dispatch<SetStateAction<Edge<{ label: string }>[]>>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <ControlButton onClick={onOpen}>
        <CirclePlusIcon />
      </ControlButton>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <ModalBody className="p-7">
              <NodeForm
                nodes={nodes}
                setNodes={setNodes}
                setEdges={setEdges}
                onClose={onClose}
              />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
