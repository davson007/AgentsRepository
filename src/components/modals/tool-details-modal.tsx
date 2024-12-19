import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ToolForm } from "./tool-form";
import { ToolView } from "./tool-view";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Entity, EntityVersion } from '@/types/entities';
import { toast } from "@/components/ui/use-toast";
import '@/styles/fonts.css';
import { getLatestVersion } from '@/features/personas/types';
import { DeleteConfirmationModal } from './delete-confirmation-modal';

interface ToolDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string | null, data: Entity) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  item: Entity;
  isEditing?: boolean;
}

export function ToolDetailsModal({ isOpen, onClose, onSave, onDelete, item, isEditing: initialIsEditing = false }: ToolDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(initialIsEditing || !item?.id);
  const [selectedVersion, setSelectedVersion] = useState(item?.version || 'v1.0');
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  const getCurrentVersionData = (): Entity => {
    const versionData = item?.versions?.find(v => v.version === selectedVersion)?.data;
    return {
      id: item?.id || '',
      name: item?.name || '',
      version: selectedVersion,
      description: item?.description || '',
      mainObjective: item?.mainObjective || '',
      code: item?.code || '',
      codeType: item?.codeType || 'python',
      systemPrompt: item?.systemPrompt || '',
      userPromptTemplate: item?.userPromptTemplate || '',
      notes: item?.notes || '',
      picture: versionData?.picture || item?.picture || ''
    };
  };

  const [formData, setFormData] = useState<Entity>(getCurrentVersionData());
  
  useEffect(() => {
    if (item) {
      setSelectedVersion(item.version || 'v1.0');
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
      const versionData = {
        name: formData.name,
        version: selectedVersion,
        description: formData.description,
        mainObjective: formData.mainObjective,
        code: formData.code,
        codeType: formData.codeType,
        systemPrompt: formData.systemPrompt,
        userPromptTemplate: formData.userPromptTemplate,
        notes: formData.notes || '',
        picture: ''
      };

      let updatedVersions = item.versions || [];
      const existingVersionIndex = updatedVersions.findIndex(v => v.version === selectedVersion);

      if (existingVersionIndex >= 0) {
        updatedVersions[existingVersionIndex] = {
          version: selectedVersion,
          data: versionData
        };
      } else {
        updatedVersions = [
          ...updatedVersions,
          { version: selectedVersion, data: versionData }
        ];
      }

      const updateData: Entity = {
        id: item.id,
        ...versionData,
        picture: formData.picture || '',
        versions: updatedVersions
      };

      await onSave(item.id || null, updateData);
      setIsEditing(false);
      toast({
        title: "Success",
        description: `Tool ${item.id ? 'updated' : 'created'} successfully`,
        variant: "default",
      });
    } catch (error) {
      console.error('Failed to save:', error);
      toast({
        title: "Error",
        description: `Failed to ${item.id ? 'update' : 'create'} tool`,
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
      code: formData.code,
      codeType: formData.codeType,
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

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete(item.id);
      setShowDeleteConfirmation(false);
      onClose();
      toast({
        title: "Success",
        description: "Tool deleted successfully",
        variant: "default",
      });
    } catch (error) {
      console.error('Failed to delete:', error);
      toast({
        title: "Error",
        description: "Failed to delete tool",
        variant: "destructive",
      });
    }
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-3xl bg-[#FBF9FC]/95 backdrop-blur-md border-[#F58C5D]/20"
        aria-describedby="tool-modal-description"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-nord-bold text-[#383244]">
            {item?.id ? item?.name : 'New Tool'}
          </DialogTitle>
          <DialogDescription id="tool-modal-description">
            Details and configuration for the {item?.name} tool
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6 p-2">
            {isEditing ? (
              <ToolForm
                data={formData}
                onChange={handleChange}
                isNewVersion={false}
              />
            ) : (
              <ToolView 
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
        entityType="Tool"
        itemName={item?.name || ''}
      />
    </Dialog>
  );  
}