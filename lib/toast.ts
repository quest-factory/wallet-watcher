import toast from 'react-hot-toast';

export function handleToast({
  toastId,
  status,
  statusText,
  validStatus,
}: {
  toastId: string;
  status?: number;
  statusText?: string;
  validStatus: number;
}) {
  if (status === undefined || statusText === undefined) {
    toast.error('An error occurred', { id: toastId });
    return;
  }

  if (status === validStatus) {
    toast.success('Success', {
      id: toastId,
    });
    return;
  }

  toast.error(`${statusText}`, { id: toastId });
}
