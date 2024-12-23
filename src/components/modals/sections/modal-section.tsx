import { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

interface ModalSectionProps {
  title: ReactNode;
  children: ReactNode;
  headerContent?: ReactNode;
  className?: string;
}

export function ModalSection({ title, children, headerContent, className }: ModalSectionProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-nord-book text-[#383244]/70">{title}</h3>
        {headerContent}
      </div>
      {children}
    </div>
  );
}