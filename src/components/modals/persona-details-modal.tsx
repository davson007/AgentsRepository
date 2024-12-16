import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PersonaForm } from "./persona-form";
import { PersonaView } from "./persona-view";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { PersonaFormData, PersonaVersion } from "@/types/personas";
import '@/styles/fonts.css';

interface PersonaDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: PersonaFormData) => Promise<void>;
  item?: {
    id: string;
    name: string;
    version?: string;
    description: string;
    mainObjective?: string;
    systemPrompt?: string;
    userPromptTemplate?: string;
    versions?: PersonaVersion[];
  };
}

export function PersonaDetailsModal({ isOpen, onClose, onSave, item }: PersonaDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(!item?.id);
  const [selectedVersion, setSelectedVersion] = useState(item?.version || 'v1.0');
  const [isSaving, setIsSaving] = useState(false);
  
  const getCurrentVersionData = () => {
    return {
      name: item?.name,
      version: selectedVersion,
      description: item?.description,
      mainObjective: item?.mainObjective,
      systemPrompt: item?.systemPrompt,
      userPromptTemplate: item?.userPromptTemplate,
      notes: item?.notes,
      picture: item?.picture
    };
  };

  const [formData, setFormData] = useState<PersonaFormData>(getCurrentVersionData());
  
  // Update form data when item changes
  useEffect(() => {
    if (item) {
      setSelectedVersion(item.version || 'v1.0');
      setIsEditing(!item.id);
      setFormData(getCurrentVersionData());
    }
  }, [item]);

  const versions = item?.versions?.map(v => ({
    value: v.version,
    label: v.version
  })) || [{ value: 'v1.0', label: 'v1.0' }];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
    const versionData = item?.versions?.find(v => v.version === version)?.data;
    if (versionData) {
      setFormData(versionData);
    }
  };

  const handleSave = async () => {
    if (!item?.id) return;
    
    setIsSaving(true);
    try {
      const currentVersion = item.versions?.find(v => v.version === selectedVersion);
      const updatedVersions = currentVersion
        ? item.versions?.map(v => v.version === selectedVersion ? { ...v, data: formData } : v)
        : [...(item.versions || []), { version: selectedVersion, data: formData }];
      
      await onSave(item.id, {
        ...formData,
        versions: updatedVersions,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewVersion = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    console.log('Deleting:', item?.id);
    onClose();
  };

  const handleCancel = () => {
    if (!item?.id) {
      // For new personas, just close the modal
      onClose();
      return;
    }
    // For existing personas, switch back to view mode
    setIsEditing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-[#FBF9FC]/95 backdrop-blur-md border-[#F58C5D]/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-nord-bold text-[#383244]">
            {item?.name || ''}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6 p-2">
            {isEditing ? (
              <PersonaForm
                data={formData}
                onChange={handleChange}
                isNewVersion={false}
              />
            ) : (
              <PersonaView 
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
    </Dialog>
  );
}