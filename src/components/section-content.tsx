import { GridLayout } from "@/components/ui/grid-layout";
import { ItemCard } from "@/components/item-card";
import { SectionHeader } from "@/components/section-header";
import type { SectionId } from "@/constants/navigation";

interface ContentItem {
  id: string;
  name: string;
  description: string;
  icon: any; // Using any temporarily, should be refined based on your icon type
}

interface SectionContentProps {
  sectionId: SectionId;
  items: ContentItem[];
  onItemClick: (id: string) => void;
  onAddNew: () => void;
}

export function SectionContent({ sectionId, items, onItemClick, onAddNew }: SectionContentProps) {
  const title = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);

  return (
    <div className="p-6 space-y-6">
      <SectionHeader title={title} onAddNew={onAddNew} />
      <GridLayout>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            icon={item.icon}
            title={item.name}
            description={item.description}
            onClick={() => onItemClick(item.id)}
          />
        ))}
      </GridLayout>
    </div>
  );
}