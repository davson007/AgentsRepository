import { type ReactNode } from 'react';

interface ModalSectionProps {
  title: string;
  children: ReactNode;
  headerContent?: ReactNode;
}

export function ModalSection({ title, children, headerContent }: ModalSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-nord-medium text-[#383244]/70">{title}</h3>
        {headerContent}
      </div>
      {children}
    </div>
  );
}