import { type ReactNode } from 'react';
import '@/styles/home-gradient.css';

interface GradientLayoutProps {
  children: ReactNode;
}

export function GradientLayout({ children }: GradientLayoutProps) {
  return (
    <div className="min-h-screen home-gradient-bg relative overflow-hidden">
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}