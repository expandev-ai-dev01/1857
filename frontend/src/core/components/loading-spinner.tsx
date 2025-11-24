import { cn } from '@/core/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return <Loader2 className={cn('h-8 w-8 animate-spin text-primary', className)} />;
}
