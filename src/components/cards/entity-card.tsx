import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import '@/styles/fonts.css';

interface EntityCardProps {
  title: string;
  description?: string;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function EntityCard({ 
  title, 
  description, 
  className,
  onEdit,
  onDelete 
}: EntityCardProps) {
  return (
    <div className={cn(
      "relative group rounded-lg overflow-hidden",
      "bg-[#FBF9FC]",
      "shadow-lg ring-5 ring-white/10",
      "hover:shadow-xl hover:ring-[#F58C5D]/20",
      "transition-all duration-300",
      className
    )}>
      {/* Icon area */}
      <div className="h-48 bg-[#F5DEAE]/10 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#FBF9FC]/80 backdrop-blur-sm flex items-center justify-center">
          <span className="text-4xl font-nord-regular text-[#F58C5D]">
            {title.charAt(0)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-[#FBF9FC]">
        <h3 className="font-nord-regular text-lg text-[#383244] truncate">{title}</h3>
        {description && (
          <p className="text-sm text-[#383244]/70 line-clamp-2 mt-1 font-nord-regular">
            {description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-2">
          {onEdit && (
            <Button size="icon" variant="ghost" className="h-8 w-8 text-[#383244] hover:text-[#F58C5D] hover:bg-white/50" onClick={onEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button size="icon" variant="ghost" className="h-8 w-8 text-[#383244] hover:text-red-500 hover:bg-white/50" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}