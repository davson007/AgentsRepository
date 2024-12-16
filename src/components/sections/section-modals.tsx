import { ItemDetailsModal } from "@/components/modals/item-details-modal";
import { PersonaDetailsModal } from "@/components/modals/persona-details-modal";
import { usePersonas } from '@/features/personas';
import type { PersonaFormData } from '@/types/personas';
import { Entity } from '@/types/entities';

interface SectionModalsProps {
  selectedItem: AIPersona | null;
  showPersonaForm: boolean;
  onClose: () => void;
  title: string;
}

export function SectionModals({
  selectedItem,
  showPersonaForm,
  onClose,
  title
}: SectionModalsProps) {
  console.log('SectionModals - props:', {
    selectedItem,
    showPersonaForm,
    title
  });

  const { updatePersona } = usePersonas();

  const handleSave = async (id: string, updatedData: PersonaFormData) => {
    console.log('SectionModals - handleSave:', {
      id,
      updatedData
    });

    if (updatePersona.isPending) return;
    
    try {
      await updatePersona.mutateAsync({ id, data });
      onClose();
    } catch (error) {
      console.error('Error updating persona:', error);
    }
  };

  if (!selectedItem) {
    console.log('SectionModals - no selectedItem, returning null');
    return null;
  }

  if (title.toLowerCase() === 'personas' && showPersonaForm) {
    console.log('SectionModals - rendering PersonaDetailsModal');
    return (
      <PersonaDetailsModal
        isOpen={true}
        onClose={onClose}
        item={selectedItem}
        onSave={handleSave}
      />
    );
  }

  console.log('SectionModals - rendering ItemDetailsModal');
  return (
    <ItemDetailsModal
      isOpen={true}
      onClose={onClose}
      item={selectedItem}
    />
  );
}