import { ItemDetailsModal } from "@/components/modals/item-details-modal";
import { PersonaDetailsModal } from "@/components/modals/persona-details-modal";
import { usePersonas } from '@/features/personas';
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
  const { updatePersona, createPersona, deletePersona } = usePersonas();

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

  const handleDelete = async (id: string) => {
    try {
      await deletePersona.mutateAsync(id);
      onClose();
    } catch (error) {
      console.error('Error deleting persona:', error);
      throw error; // Re-throw to trigger error handling in the modal
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
        onDelete={handleDelete}
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