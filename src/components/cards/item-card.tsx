import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import '@/styles/fonts.css';

interface ItemCardProps {
  title: string;
  description?: string;
  picture?: string;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

export function ItemCard({ 
  title, 
  description, 
  picture,
  className,
  onEdit,
  onDelete,
  onClick
}: ItemCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Prevent click when clicking action buttons
    if ((e.target as HTMLElement).closest('button')) return;
    onClick?.();
  };

  return (
    <div 
      className={cn(
        "relative group rounded-xl overflow-hidden cursor-pointer",
        "bg-[#FBF9FC]",
        "shadow-lg ring-5 ring-white/10",
        "hover:shadow-xl hover:ring-[#F58C5D]/20",
        "transition-all duration-300",
        className
      )}
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden bg-[#F5DEAE]/10">
        {picture ? (
          <img
            src={picture}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#FBF9FC]/80 backdrop-blur-sm rounded-full flex items-center justify-center">
              <span className="text-xl font-nord-regular text-[#F58C5D]">
                {title.charAt(0)}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-[#FBF9FC]">
        <h3 className="text-sm font-nord-regular mb-1 text-[#383244]">{title}</h3>
        {description && (
          <p className="text-xs text-[#383244]/70 line-clamp-2 font-nord-regular">
            {description}
          </p>
        )}
      </div>

      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {onEdit && (
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-7 w-7 text-[#383244] hover:text-[#F58C5D] hover:bg-white/50" 
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
        {onDelete && (
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-7 w-7 text-[#383244] hover:text-red-500 hover:bg-white/50" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}