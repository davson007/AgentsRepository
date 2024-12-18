import { useState } from 'react';
import { ItemCard } from "@/components/cards/item-card";
import { GridLayout } from "@/components/ui/grid-layout";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SectionModals } from './section-modals';
import { Entity } from '../../types/entities';
import { INITIAL_VERSION } from '@/features/personas/types';
import '@/styles/fonts.css';
import { usePersonas } from '@/features/personas';
import { toast } from "@/components/ui/use-toast";
import { DeleteConfirmationModal } from '@/components/modals/delete-confirmation-modal';
import { useAgents } from '@/features/personas/hooks/use-agents';
import { AgentDetailsModal } from '@/components/modals/agent-details-modal';

interface SectionGridProps {
  title: string;
  items: Entity[];
  isLoading?: boolean;
}

type DisplayOption = 'all' | 'favorites';

export function SectionGrid({ title, items, isLoading }: SectionGridProps) {
  const { toggleFavorite, deletePersona } = usePersonas();
  const { createAgent, updateAgent, deleteAgent, toggleFavorite: toggleAgentFavorite } = useAgents();
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showPersonaForm, setShowPersonaForm] = useState(false);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Entity | null>(null);
  const [displayOption, setDisplayOption] = useState<DisplayOption>('all');

  // Sort and filter items
  const filteredItems = [...items]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(item => displayOption === 'all' || (displayOption === 'favorites' && item.isFavorite));

  const handleItemClick = (item: Entity) => {
    if (title.toLowerCase() === 'personas') {
      setShowPersonaForm(true);
      setSelectedItem(item);
    } else if (title.toLowerCase() === 'agents') {
      setShowAgentForm(true);
      setSelectedItem(item);
    }
  };

  const handleAddNew = () => {
    const newEntity: Entity = {
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
    
    if (title.toLowerCase() === 'personas') {
      setShowPersonaForm(true);
      setSelectedItem(newEntity);
    } else if (title.toLowerCase() === 'agents') {
      setShowAgentForm(true);
      setSelectedItem(newEntity);
    }
  };

  const handleCloseModals = () => {
    setShowPersonaForm(false);
    setSelectedItem(null);
  };

  const handleFavorite = async (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    
    try {
      if (title.toLowerCase() === 'personas') {
        await toggleFavorite.mutateAsync({ id, isFavorite: !item.isFavorite });
      } else if (title.toLowerCase() === 'agents') {
        await toggleAgentFavorite.mutateAsync({ id, isFavorite: !item.isFavorite });
      }
      toast({
        title: "Success",
        description: `${item.name} ${!item.isFavorite ? 'added to' : 'removed from'} favorites`,
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (item: Entity) => {
    setItemToDelete(item);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      if (title.toLowerCase() === 'personas') {
        await deletePersona.mutateAsync(itemToDelete.id);
      } else if (title.toLowerCase() === 'agents') {
        await deleteAgent.mutateAsync(itemToDelete.id);
      }
      setShowDeleteConfirmation(false);
      setItemToDelete(null);
      toast({
        title: "Success",
        description: `${title.slice(0, -1)} deleted successfully`,
      });
    } catch (error) {
      console.error(`Error deleting ${title.toLowerCase()}:`, error);
      toast({
        title: "Error",
        description: `Failed to delete ${title.toLowerCase()}`,
        variant: "destructive",
      });
    }
  };

  // Add form handling for agents
  const handleAgentFormClose = () => {
    setShowAgentForm(false);
    setSelectedItem(null);
  };

  const handleAgentFormSave = async (agent: Entity) => {
    try {
      if (agent.id) {
        await updateAgent.mutateAsync({ id: agent.id, data: agent });
      } else {
        await createAgent.mutateAsync(agent);
      }
      handleAgentFormClose();
    } catch (error) {
      console.error('Error saving agent:', error);
      toast({
        title: "Error",
        description: "Failed to save agent",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-nord-bold tracking-tight" style={{ color: '#F58C5D' }}>
          {title}
        </h2>
        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Display options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="min-w-[160px] bg-white/95 backdrop-blur-sm"
            >
              <DropdownMenuItem 
                className="hover:bg-[#F58C5D]/40 focus:bg-[#F58C5D]/40 cursor-pointer"
                onClick={() => setDisplayOption('all')}
              >
                Display all
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-[#F58C5D]/40 focus:bg-[#F58C5D]/40 cursor-pointer"
                onClick={() => setDisplayOption('favorites')}
              >
                Display Favorites
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleAddNew} className="bg-[#F58C5D] hover:bg-[#F58C5D]/90">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      <GridLayout>
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            title={item.name}
            picture={item.picture}
            description={item.description}
            onClick={() => handleItemClick(item)}
            onEdit={() => handleItemClick(item)}
            onDelete={() => handleDelete(item)}
            onFavorite={() => handleFavorite(item.id)}
            isFavorite={item.isFavorite}
          />
        ))}
      </GridLayout>

      {showPersonaForm && (
        <SectionModals
          selectedItem={selectedItem}
          showPersonaForm={showPersonaForm}
          onClose={handleCloseModals}
          title={title}
        />
      )}

      {showAgentForm && (
        <AgentDetailsModal
          isOpen={showAgentForm}
          onClose={handleAgentFormClose}
          onSave={async (id, data) => {
            try {
              if (id) {
                await updateAgent.mutateAsync({ id, data });
              } else {
                await createAgent.mutateAsync(data);
              }
              handleAgentFormClose();
            } catch (error) {
              console.error('Error saving agent:', error);
              throw error;
            }
          }}
          onDelete={async (id) => {
            try {
              setItemToDelete(selectedItem);
              setShowDeleteConfirmation(true);
              handleAgentFormClose();
            } catch (error) {
              console.error('Error deleting agent:', error);
              throw error;
            }
          }}
          item={selectedItem!}
        />
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleConfirmDelete}
        entityType={title.slice(0, -1)}
        itemName={itemToDelete?.name || ''}
      />
    </div>
  );
}