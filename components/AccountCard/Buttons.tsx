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
import { removeAddresses, updateAlert } from '@/actions/addresses';
import BellSlashIcon from '../icons/BellSlashIcon';
import { Tables } from '@/types_db';

export default function Buttons({
  className,
  addressId,
  alert_enabled,
}: {
  className?: string;
  addressId: number;
  alert_enabled: Tables<'addresses'>['alert_enabled'];
}) {
  const iconClasses = 'size-4 opacity-60';

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
        {alert_enabled ? (
          <DropdownItem
            key="disable_alert"
            startContent={<BellSlashIcon className={iconClasses} />}
            onPress={() => updateAlert({ id: addressId, alert_enabled: false })}
          >
            Disable alert
          </DropdownItem>
        ) : (
          <DropdownItem
            key="enable_alert"
            startContent={<BellIcon className={iconClasses} />}
            onPress={() => updateAlert({ id: addressId, alert_enabled: true })}
          >
            Enable alert
          </DropdownItem>
        )}

        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<TrashIcon className={`${iconClasses} text-danger`} />}
          onPress={() => removeAddresses(addressId)}
        >
          Remove account
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
