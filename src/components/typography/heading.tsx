import { cn } from '@/lib/utils';

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export function Heading({ 
  children, 
  level = 1, 
  className 
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag className={cn(
      'font-nord',
      level === 1 && 'text-3xl',
      level === 2 && 'text-2xl',
      level === 3 && 'text-xl',
      level === 4 && 'text-lg',
      level === 5 && 'text-base',
      level === 6 && 'text-sm',
      className
    )}>
      {children}
    </Tag>
  );
}