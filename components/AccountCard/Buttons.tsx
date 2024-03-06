'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import BellIcon from '../icons/BellIcon';
import TrashIcon from '../icons/TrashIcon';
import EllipsisIcon from '../icons/EllipsisIcon';
import { removeAddresses } from '@/actions/addresses';
import BellSlashIcon from '../icons/BellSlashIcon';
import { Tables } from '@/types_db';

export default function Buttons({
  className,
  addressId,
}: {
  className?: string;
  addressId: number;
}) {
  return (
    <Dropdown className={className}>
      <DropdownTrigger
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <button className="flex items-center justify-center">
          <EllipsisIcon className="text-default-500 size-4" />
        </button>
      </DropdownTrigger>

      <DropdownMenu variant="flat">
        {/* {notificationId ? (
          <DropdownItem
            key="disable_alert"
            startContent={<BellSlashIcon className="size-4 opacity-60" />}
            onPress={() => removeNotification(notificationId)}
          >
            Disable alert
          </DropdownItem>
        ) : (
          <DropdownItem
            key="enable_alert"
            startContent={<BellIcon className="size-4 opacity-60" />}
            onPress={() => createNotification(addressId)}
          >
            Enable alert
          </DropdownItem>
        )} */}

        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<TrashIcon className="size-4 text-danger opacity-60" />}
          onPress={() => removeAddresses(addressId)}
        >
          Remove account
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
