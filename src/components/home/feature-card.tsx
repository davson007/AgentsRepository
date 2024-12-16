import { type ReactNode } from 'react';
import '@/styles/fonts.css';

interface FeatureCardProps {
  image: string;
  title: string;
  onClick: () => void;
  className?: string;
  children?: ReactNode;
}

export function FeatureCard({ image, title, onClick, className = '', children }: FeatureCardProps) {
  return (
    <div className={`w-[280px] ${className}`}>
      <div
        className="cursor-pointer group transform transition-all duration-300 hover:translate-y-[-8px]"
        onClick={onClick}
      >
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[9/16] overflow-hidden rounded-lg bg-muted 
            shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
            ring-[5px] ring-black/5 
            group-hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] 
            group-hover:ring-primary/20 
            transition-all duration-300">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <h2 className="text-base font-nord-regular text-center transition-colors"
              style={{ color: '#F5DEAE' }}>
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
}