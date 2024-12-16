import { type ReactNode } from 'react';
import { ItemDetailsModal } from "@/components/modals/item-details-modal";
import { PersonaDetailsModal } from "@/components/modals/persona-details-modal";
import { usePersonas } from '@/features/personas';
import type { PersonaFormData } from '@/types/personas';

interface Entity {
  id: string;
  name: string;
  version: string;
  description: string;
  mainObjective: string;
  systemPrompt: string;
  userPromptTemplate: string;
  notes: string;
  picture: string;
  versions?: Array<{
    version: string;
    data: PersonaFormData;
  }>;
}

interface SectionModalsProps {
  selectedItem: Entity | null;
  showPersonaForm: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export function SectionModals({
  selectedItem,
  showPersonaForm,
  onClose,
}: SectionModalsProps) {
  const { updatePersona } = usePersonas();

  const handleSave = async (id: string, updatedData: PersonaFormData) => {
    if (updatePersona.isPending) return;
    
    try {
      await updatePersona.mutateAsync({ id, updates: updatedData });
      onClose();
    } catch (error) {
      // Error handling is in the mutation
    }
  };

  if (!selectedItem) return null;

  if (showPersonaForm) {
    return (
      <PersonaDetailsModal
        isOpen={true}
        onClose={onClose}
        item={selectedItem}
        onSave={handleSave}
      />
    );
  }

  return (
    <ItemDetailsModal
      isOpen={true}
      onClose={onClose}
      item={selectedItem}
    />
  );
}