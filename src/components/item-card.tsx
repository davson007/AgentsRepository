import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ItemCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

export function ItemCard({ icon: Icon, title, description, onClick, className }: ItemCardProps) {
  return (
    <Card 
      className={cn("cursor-pointer hover:shadow-lg transition-shadow", className)}
      onClick={onClick}
    >
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
    </Card>
  );
}