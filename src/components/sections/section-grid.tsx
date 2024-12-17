import { useState } from 'react';
import { ItemCard } from "@/components/cards/item-card";
import { GridLayout } from "@/components/ui/grid-layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SectionModals } from './section-modals';
import { Entity } from '../../types/entities';
import { INITIAL_VERSION } from '@/features/personas/types';
import '@/styles/fonts.css';

interface SectionGridProps {
  title: string;
  items: Entity[];
  isLoading?: boolean;
}

export function SectionGrid({ title, items, isLoading }: SectionGridProps) {
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showPersonaForm, setShowPersonaForm] = useState(false);

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
      const newPersona: Entity = {
        id: '',
        name: '',
        version: INITIAL_VERSION,
        description: '',
        mainObjective: '',
        systemPrompt: '',
        userPromptTemplate: '',
        notes: '',
        versions: [{
          version: INITIAL_VERSION,
          data: {
            name: '',
            version: INITIAL_VERSION,
            description: '',
            mainObjective: '',
            systemPrompt: '',
            userPromptTemplate: '',
            notes: ''
          }
        }]
      };
      
      setShowPersonaForm(true);
      setSelectedItem(newPersona);
    }
  };

  const handleCloseModals = () => {
    setShowPersonaForm(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-nord-bold tracking-tight" style={{ color: '#F58C5D' }}>
          {title}
        </h2>
        <Button onClick={handleAddNew} className="bg-[#F58C5D] hover:bg-[#F58C5D]/90">
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
            onClick={() => handleItemClick(item)}
          />
        ))}
      </GridLayout>

      <SectionModals
        selectedItem={selectedItem}
        showPersonaForm={showPersonaForm}
        onClose={handleCloseModals}
        title={title}
      />
    </div>
  );
}