import { type ReactNode } from 'react';
import { ItemDetailsModal } from "@/components/modals/item-details-modal";
import { PersonaDetailsModal } from "@/components/modals/persona-details-modal";
import { usePersonas } from '@/features/personas';
import type { PersonaFormData, AIPersona } from '@/features/personas/types';

interface SectionModalsProps {
  selectedItem: AIPersona | null;
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

  const handleSave = async (id: string, data: PersonaFormData) => {
    if (updatePersona.isPending) return;
    
    try {
      await updatePersona.mutateAsync({ id, data });
      onClose();
    } catch (error) {
      console.error('Failed to save:', error);
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