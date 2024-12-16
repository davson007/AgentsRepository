import { toast as sonnerToast } from 'sonner';

export type ToastProps = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

export function toast({ title, description, variant = 'default' }: ToastProps) {
  sonnerToast[variant === 'destructive' ? 'error' : 'success'](title, {
    description,
    duration: 2000,
  });
}