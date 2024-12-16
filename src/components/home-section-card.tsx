import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HomeSectionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

export function HomeSectionCard({ 
  icon: Icon, 
  title, 
  description, 
  onClick, 
  className 
}: HomeSectionCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer hover:shadow-lg transition-all hover:scale-105 group",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pt-6 pb-2">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}