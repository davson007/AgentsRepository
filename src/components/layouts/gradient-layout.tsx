import '@/styles/home-gradient.css';

interface GradientLayoutProps {
  children: React.ReactNode;
}

export function GradientLayout({ children }: GradientLayoutProps) {
  return (
    <div className="relative min-h-screen home-gradient-bg">
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}