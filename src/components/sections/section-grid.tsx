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
import { ToolDetailsModal } from '@/components/modals/tool-details-modal';
import { useTools } from '@/features/personas/hooks/use-tools';
import { CredentialDetailsModal } from '@/components/modals/credential-details-modal';
import { Credential } from '../../types/credentials';
import { useQueryClient } from '@tanstack/react-query';
import { useCredentials } from "@/features/personas/hooks/use-credentials";

interface SectionGridProps {
  title: string;
  items: Entity[];
  isLoading?: boolean;
}

type DisplayOption = 'all' | 'favorites';

export function SectionGrid({ title, items }: SectionGridProps) {
  const { toggleFavorite, deletePersona } = usePersonas();
  const { createAgent, updateAgent, deleteAgent, toggleFavorite: toggleAgentFavorite } = useAgents();
  const { createTool, updateTool, deleteTool, toggleFavorite: toggleToolFavorite } = useTools();
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showPersonaForm, setShowPersonaForm] = useState(false);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Entity | null>(null);
  const [displayOption, setDisplayOption] = useState<DisplayOption>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [showToolForm, setShowToolForm] = useState(false);
  const [showCredentialForm, setShowCredentialForm] = useState(false);
  const queryClient = useQueryClient();
  const { updateCredential, createCredential, deleteCredential, credentials, toggleFavorite: toggleCredentialFavorite } = useCredentials();

  // Sort and filter items
  const filteredItems = [...items]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(item => displayOption === 'all' || (displayOption === 'favorites' && item.isFavorite === true));

  console.log('Filtered Items:', filteredItems);
  console.log('Raw Items:', items);
  console.log('Credentials Data:', credentials.data);

  const handleItemClick = (item: Entity) => {
    if (title.toLowerCase() === 'personas') {
      setShowPersonaForm(true);
      setSelectedItem(item);
    } else if (title.toLowerCase() === 'agents') {
      setShowAgentForm(true);
      setSelectedItem(item);
      setIsEditing(false);
    } else if (title.toLowerCase() === 'tools') {
      setShowToolForm(true);
      setSelectedItem(item);
      setIsEditing(false);
    } else if (title.toLowerCase() === 'credentials') {
      setShowCredentialForm(true);
      setSelectedItem(item);
      setIsEditing(false);
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
      picture: '',
      versions: [{
        version: INITIAL_VERSION,
        data: {
          name: '',
          version: INITIAL_VERSION,
          description: '',
          mainObjective: '',
          systemPrompt: '',
          userPromptTemplate: '',
          notes: '',
          picture: ''
        }
      }]
    };
    
    if (title.toLowerCase() === 'personas') {
      setShowPersonaForm(true);
      setSelectedItem(newEntity);
    } else if (title.toLowerCase() === 'agents') {
      setShowAgentForm(true);
      setSelectedItem(newEntity);
    } else if (title.toLowerCase() === 'tools') {
      setShowToolForm(true);
      setSelectedItem(newEntity);
    } else if (title.toLowerCase() === 'credentials') {
      setShowCredentialForm(true);
      setSelectedItem(newEntity);
      setIsEditing(true);
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
      } else if (title.toLowerCase() === 'tools') {
        await toggleToolFavorite.mutateAsync({ id, isFavorite: !item.isFavorite });
      } else if (title.toLowerCase() === 'credentials') {
        await toggleCredentialFavorite.mutateAsync({ id, isFavorite: !item.isFavorite });
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
      } else if (title.toLowerCase() === 'tools') {
        await deleteTool.mutateAsync(itemToDelete.id);
      } else if (title.toLowerCase() === 'credentials') {
        await deleteCredential.mutateAsync(itemToDelete.id);
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

  const handleToolFormClose = () => {
    setShowToolForm(false);
    setSelectedItem(null);
  };

  const handleToolSave = async (id: string | null, data: Entity) => {
    try {
      if (id) {
        await updateTool.mutateAsync({ id, data });
      } else {
        await createTool.mutateAsync(data);
      }
      handleToolFormClose();
    } catch (error) {
      console.error('Error saving tool:', error);
      toast({
        title: "Error",
        description: "Failed to save tool",
        variant: "destructive",
      });
    }
  };

  const handleToolDelete = async (id: string) => {
    try {
      await deleteTool.mutateAsync(id);
      handleToolFormClose();
      toast({
        title: "Success",
        description: "Tool deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting tool:', error);
      toast({
        title: "Error",
        description: "Failed to delete tool",
        variant: "destructive",
      });
    }
  };

  const handleCredentialFormClose = () => {
    setShowCredentialForm(false);
    setSelectedItem(null);
  };

  const handleCredentialSave = async (id: string | null, data: Credential) => {
    try {
      if (id) {
        await updateCredential.mutateAsync({ id, data });
      } else {
        await createCredential.mutateAsync(data);
      }
      handleCredentialFormClose();
      queryClient.invalidateQueries({ queryKey: ['api_credentials'] });
    } catch (error) {
      console.error('Error saving credential:', error);
      toast({
        title: "Error",
        description: "Failed to save credential",
        variant: "destructive",
      });
    }
  };

  const handleCredentialDelete = async (id: string) => {
    try {
      await deleteCredential.mutateAsync(id);
      handleCredentialFormClose();
      toast({
        title: "Success",
        description: "Credential deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting credential:', error);
      toast({
        title: "Error",
        description: "Failed to delete credential",
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
            onEdit={() => {
              if (title.toLowerCase() === 'agents') {
                setShowAgentForm(true);
              } else if (title.toLowerCase() === 'tools') {
                setShowToolForm(true);
              } else if (title.toLowerCase() === 'personas') {
                setShowPersonaForm(true);
              } else if (title.toLowerCase() === 'credentials') {
                setShowCredentialForm(true);
              }
              setSelectedItem(item);
              setIsEditing(true);
            }}
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
              await deleteAgent.mutateAsync(id);
              handleAgentFormClose();
              toast({
                title: "Success",
                description: "Agent deleted successfully",
              });
            } catch (error) {
              console.error('Error deleting agent:', error);
              toast({
                title: "Error",
                description: "Failed to delete agent",
                variant: "destructive",
              });
              throw error;
            }
          }}
          item={selectedItem!}
          isEditing={isEditing}
        />
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleConfirmDelete}
        entityType={title.slice(0, -1)}
        itemName={itemToDelete?.name || ''}
      />

      {showToolForm && selectedItem && (
        <ToolDetailsModal
          isOpen={showToolForm}
          onClose={handleToolFormClose}
          onSave={handleToolSave}
          onDelete={handleToolDelete}
          item={selectedItem}
          isEditing={isEditing}
        />
      )}

      {showCredentialForm && selectedItem && (
        <CredentialDetailsModal
          isOpen={showCredentialForm}
          onClose={handleCredentialFormClose}
          onSave={handleCredentialSave}
          onDelete={handleCredentialDelete}
          item={selectedItem as unknown as Credential}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}