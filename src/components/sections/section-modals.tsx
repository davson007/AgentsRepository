import { ItemDetailsModal } from "@/components/modals/item-details-modal";
import { PersonaDetailsModal } from "@/components/modals/persona-details-modal";
import { usePersonas } from '@/hooks/use-personas';
import { Entity } from '../../types/entities';

interface SectionModalsProps {
  selectedItem: Entity | null;
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
  const { updatePersona, createPersona } = usePersonas();

  const handleSave = async (id: string | null, data: Entity) => {
    try {
      if (!id) {
        await createPersona.mutateAsync(data);
      } else {
        await updatePersona.mutateAsync({ id, data });
      }
      onClose();
    } catch (error) {
      console.error('Error saving persona:', error);
    }
  };

  if (!selectedItem) return null;

  if (title.toLowerCase() === 'personas' && showPersonaForm) {
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