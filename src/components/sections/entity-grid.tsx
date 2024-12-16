import { GridLayout } from "@/components/ui/grid-layout";
import { EntityCard } from "@/components/cards/entity-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Entity {
  id: string;
  name: string;
  description?: string;
}

interface EntityGridProps {
  title: string;
  entities: Entity[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function EntityGrid({
  title,
  entities,
  onAdd,
  onEdit,
  onDelete,
}: EntityGridProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <GridLayout>
        {entities.map((entity) => (
          <EntityCard
            key={entity.id}
            title={entity.name}
            description={entity.description}
            onEdit={() => onEdit(entity.id)}
            onDelete={() => onDelete(entity.id)}
          />
        ))}
      </GridLayout>
    </div>
  );
}