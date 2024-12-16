import { type ReactNode } from 'react';
import { ItemDetailsModal } from "@/components/modals/item-details-modal";
import { PersonaDetailsModal } from "@/components/modals/persona-details-modal";
import { usePersonas } from '@/features/personas';
import { toast } from '@/components/ui/use-toast';
import type { PersonaFormData } from '@/types/personas';

interface Entity {
  id: string;
  name: string;
  description?: string;
  [key: string]: any;
}

interface SectionModalsProps {
  selectedItem: Entity | null;
  showPersonaForm: boolean;
  onClose: () => void;
  onEdit: (id: string) => void;
  title: string;
  children?: ReactNode;
}

export function SectionModals({
  selectedItem,
  showPersonaForm,
  onClose,
  onEdit,
  title
}: SectionModalsProps) {
  const { updatePersona, createPersona } = usePersonas();

  const handleSave = async (id: string, updatedData: PersonaFormData) => {
    try {
      if (id) {
        await updatePersona.mutateAsync({ 
          id, 
          updates: updatedData
        });
        toast({
          title: "Success",
          description: "Persona updated successfully",
        });
      } else {
        await createPersona.mutateAsync(updatedData);
        toast({
          title: "Success",
          description: "Persona created successfully",
        });
      }
      
      if (id) onEdit(id);
      onClose();
    } catch (error) {
      console.error('Failed to update persona:', error);
      toast({
        title: "Error",
        description: `Failed to ${id ? 'update' : 'create'} persona. Please try again.`,
        variant: "destructive",
      });
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