import { useState } from 'react';
import { ItemCard } from "@/components/cards/item-card";
import { GridLayout } from "@/components/ui/grid-layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SectionModals } from './section-modals';
import { Entity } from '@/types/entities';
import '@/styles/fonts.css';

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

  const handleItemClick = (item: Entity) => {
    console.log('handleItemClick - item received:', item);
    console.log('handleItemClick - title:', title);

    if (title.toLowerCase() === 'personas') {
      setShowPersonaForm(true);
      const processedItem: Entity = {
        id: item.id,
        name: item.name,
        version: item.version || 'v1.0',
        description: item.description || '',
        mainObjective: item.mainObjective || '',
        systemPrompt: item.systemPrompt || '',
        userPromptTemplate: item.userPromptTemplate || '',
        notes: item.notes || '',
        picture: item.picture,
        versions: Array.isArray(item.versions) ? item.versions : [{
          version: 'v1.0',
          data: {
            name: item.name,
            version: 'v1.0',
            description: item.description || '',
            mainObjective: item.mainObjective || '',
            systemPrompt: item.systemPrompt || '',
            userPromptTemplate: item.userPromptTemplate || '',
            notes: item.notes || '',
            picture: item.picture
          }
        }]
      };
      
      console.log('handleItemClick - processed item:', processedItem);
      setSelectedItem(processedItem);
    } else {
      console.log('handleItemClick - non-persona item:', item);
      setSelectedItem(item);
    }
  };

  const handleAddNew = () => {
    console.log('handleAddNew - title:', title);
    
    if (title.toLowerCase() === 'personas') {
      const newPersona: Entity = {
        id: '',
        name: 'New Persona',
        version: 'v1.0',
        description: '',
        mainObjective: '',
        systemPrompt: '',
        userPromptTemplate: '',
        notes: '',
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
      };
      
      console.log('handleAddNew - new persona:', newPersona);
      setShowPersonaForm(true);
      setSelectedItem(newPersona);
    } else {
      console.log('handleAddNew - calling onAdd');
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
        title={title}
      />
    </>
  );
}