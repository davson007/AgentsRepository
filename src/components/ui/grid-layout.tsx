import { cn } from "@/lib/utils";

interface GridLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function GridLayout({ children, className }: GridLayoutProps) {
  return (
    <div className={cn(
      "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4", 
      className
    )}>
      {children}
    </div>
  );
}