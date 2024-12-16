import { type ReactNode } from 'react';

interface ModalSectionProps {
  title: string;
  children: ReactNode;
}

export function ModalSection({ title, children }: ModalSectionProps) {
  return (
    <div>
      <h3 className="text-xs font-nord-bold text-[#383244]/70 mb-2">{title}</h3>
      {children}
    </div>
  );
}