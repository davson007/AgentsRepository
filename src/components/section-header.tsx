import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  onAddNew: () => void;
}

export function SectionHeader({ title, onAddNew }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Button onClick={onAddNew}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New
      </Button>
    </div>
  );
}