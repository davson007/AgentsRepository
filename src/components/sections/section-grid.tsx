import { useState } from 'react';
import { ItemCard } from "@/components/cards/item-card";
import { GridLayout } from "@/components/ui/grid-layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SectionModals } from './section-modals';
import { usePersonas } from '@/features/personas';
import '@/styles/fonts.css';

interface Entity {
  id: string;
  name: string;
  description?: string;
  versions?: any[];
  [key: string]: any;
}

interface SectionGridProps {
  title: string;
  items: Entity[];
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function SectionGrid({
  title,
  items,
  onAdd,
  onEdit,
  onDelete,
}: SectionGridProps) {
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showPersonaForm, setShowPersonaForm] = useState(false);
  const { createPersona } = usePersonas();

  const handleItemClick = (item: Entity) => {
    if (title.toLowerCase() === 'personas') {
      setShowPersonaForm(true);
      setSelectedItem(item);
    } else {
      setSelectedItem(item);
    }
  };

  const handleAddNew = () => {
    if (title.toLowerCase() === 'personas') {
      setShowPersonaForm(true);
      setSelectedItem({
        id: '',
        name: 'New Persona',
        description: '',
        mainObjective: '',
        systemPrompt: '',
        userPromptTemplate: '',
        notes: '',
        version: 'v1.0',
        versions: [{
          version: 'v1.0',
          data: {
            name: 'New Persona',
            version: 'v1.0',
            description: '',
            mainObjective: '',
            systemPrompt: '',
            userPromptTemplate: '',
            notes: ''
          }
        }]
      });
    } else {
      onAdd?.();
    }
  };

  const handleCloseModals = () => {
    // Reset all modal state
    setShowPersonaForm(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-nord-bold tracking-tight" style={{ color: '#F58C5D' }}>
            {title}
          </h2>
          <Button onClick={handleAddNew} size="default" className="bg-[#F58C5D] hover:bg-[#F58C5D]/90">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>

        <GridLayout>
          {items.map((item) => (
            <ItemCard
              key={item.id}
              title={item.name}
              picture={item.picture}
              description={item.description}
              onEdit={() => onEdit?.(item.id)}
              onDelete={() => onDelete?.(item.id)}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </GridLayout>
      </div>

      <SectionModals
        selectedItem={selectedItem}
        showPersonaForm={showPersonaForm}
        onClose={handleCloseModals}
        onEdit={onEdit}
        title={title}
      />
    </>
  );
}