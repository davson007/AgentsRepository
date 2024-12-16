import { type ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
}

export function SectionContainer({ children }: SectionContainerProps) {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}