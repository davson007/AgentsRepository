import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Entity, EntityVersion } from '@/types/entities';
import { AgentForm } from "./agent-form";
import { AgentView } from "./agent-view";
import { toast } from "@/components/ui/use-toast";
import { getLatestVersion } from '@/features/personas/types';
import '@/styles/fonts.css';
import { DeleteConfirmationModal } from './delete-confirmation-modal';
import { INITIAL_VERSION } from '@/features/personas/types';

interface AgentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string | null, data: Entity) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  item: Entity;
}

export function AgentDetailsModal({ isOpen, onClose, onSave, onDelete, item }: AgentDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(!item?.id);
  const [selectedVersion, setSelectedVersion] = useState(item?.version || 'v1.0');
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const getCurrentVersionData = (): Entity => {
    const versions = Array.isArray(item?.versions) ? item.versions : [{
      version: INITIAL_VERSION,
      data: {
        name: item?.name || '',
        version: INITIAL_VERSION,
        description: item?.description || '',
        mainObjective: item?.mainObjective || '',
        systemPrompt: item?.systemPrompt || '',
        userPromptTemplate: item?.userPromptTemplate || '',
        notes: item?.notes || '',
        picture: item?.picture || ''
      }
    }];
    
    const versionData = versions.find(v => v.version === selectedVersion)?.data;
    
    return {
      id: item?.id || '',
      name: item?.name || '',
      version: selectedVersion,
      description: item?.description || '',
      mainObjective: item?.mainObjective || '',
      systemPrompt: item?.systemPrompt || '',
      userPromptTemplate: item?.userPromptTemplate || '',
      notes: item?.notes || '',
      picture: versionData?.picture || item?.picture || '',
      versions: versions
    };
  };

  const [formData, setFormData] = useState<Entity>(getCurrentVersionData());

  useEffect(() => {
    if (item) {
      setSelectedVersion(item.version || 'v1.0');
      setIsEditing(!item.id);
      setFormData(getCurrentVersionData());
    }
  }, [item]);

  const versions = Array.isArray(item?.versions) 
    ? item.versions.map((v: EntityVersion) => ({
        value: v.version,
        label: v.version
      })) 
    : [{ value: 'v1.0', label: 'v1.0' }];

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        };

    const handleVersionChange = (version: string) => {
        setSelectedVersion(version);
        const versionData = item?.versions?.find((v: EntityVersion) => v.version === version)?.data;
        if (versionData) {
            setFormData({
            ...formData,
            ...versionData,
            picture: item.picture || versionData.picture || ''
            });
        }
        };
        
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(item?.id || null, formData);
      toast({
        title: "Success",
        description: `Agent ${item.id ? 'updated' : 'created'} successfully`,
        variant: "default",
      });
      onClose();
    } catch (error) {
      console.error('Failed to save:', error);
      toast({
        title: "Error",
        description: `Failed to ${item.id ? 'update' : 'create'} agent`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewVersion = () => {
    const newVersion = getLatestVersion(selectedVersion);
    
    const newVersionData = {
        name: formData.name,
        version: newVersion,
        description: formData.description,
        mainObjective: formData.mainObjective,
        systemPrompt: formData.systemPrompt,
        userPromptTemplate: formData.userPromptTemplate,
        notes: formData.notes || '',
        picture: ''
      };

    const updatedVersions = [
      ...(item.versions || []),
      { 
        version: newVersion, 
        data: newVersionData 
      }
    ];

    setFormData({
      ...formData,
      version: newVersion,
      versions: updatedVersions
    });
    
    setSelectedVersion(newVersion);
    setIsEditing(true);
  };

  
  const handleCancel = () => {
    if (!item?.id) {
      onClose();
      return;
    }
    
    setFormData(getCurrentVersionData());
    setSelectedVersion(item.version);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (item?.id) {
        await onDelete(item.id);
        setShowDeleteConfirmation(false);
        onClose();
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      throw error; // Let section-grid handle the error
    }
  };

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-3xl bg-[#FBF9FC]/95 backdrop-blur-md border-[#F58C5D]/20"
        aria-describedby="agents-modal-description"
      >
          <DialogHeader>
          <DialogTitle className="text-xl font-nord-bold text-[#383244]">
            {item?.id ? item.name : 'New Agent'}
            </DialogTitle>
            <DialogDescription id="agents-modal-description">
              {item?.id 
                ? `Details and configuration for the ${item.name} agent`
                : 'Configure a new agent'}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6 p-2">
            {isEditing ? (
                  <AgentForm
                    data={formData}
                    onChange={handleChange}
                    isNewVersion={false}
                  />
                ) : (
                  <AgentView 
                    data={formData}
                    versions={versions}
                  currentVersion={selectedVersion}
                  onVersionChange={handleVersionChange}
                />
            )}

            <div className="flex justify-end gap-3 pt-4">
              {!isEditing ? (
                <>
                <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#9661A6] hover:bg-[#9661A6]/90 text-white gap-2"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={handleNewVersion}
                    className="bg-[#9661A6] hover:bg-[#9661A6]/90 text-white gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    New Version
                  </Button>
                    <Button
                      onClick={handleDelete}
                      variant="destructive"
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                    </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="text-xs font-nord-book"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-[#9661A6] hover:bg-[#9661A6]/90 text-white gap-2"
                  >
                    <Pencil className="h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </>
                  )}
                </div>
          </div>
          </ScrollArea>
        </DialogContent>
        <DeleteConfirmationModal
          isOpen={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={handleConfirmDelete}
          entityType="Agent"
          itemName={item?.name || ''}
        />
    </Dialog>
  );
} 