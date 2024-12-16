import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PersonaForm } from "./persona-form";
import { PersonaView } from "./persona-view";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { PersonaFormData, PersonaVersion } from "@/types/personas";
import '@/styles/fonts.css';
import { Entity } from '@/types/entities';

interface PersonaDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: PersonaFormData) => Promise<void>;
  item: Entity;
}

export function PersonaDetailsModal({ isOpen, onClose, onSave, item }: PersonaDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(!item?.id);
  const [selectedVersion, setSelectedVersion] = useState(item?.version || 'v1.0');
  const [isSaving, setIsSaving] = useState(false);
  
  const initialFormData = useMemo(() => ({
    name: item?.name || '',
    version: item?.version || 'v1.0',
    description: item?.description || '',
    mainObjective: item?.mainObjective || '',
    systemPrompt: item?.systemPrompt || '',
    userPromptTemplate: item?.userPromptTemplate || '',
    notes: item?.notes || '',
    picture: item?.picture || ''
  }), [item]);

  const [formData, setFormData] = useState<PersonaFormData>(() => {
    if (item?.versions?.length) {
      const latestVersion = item.versions[item.versions.length - 1];
      return latestVersion.data;
    }
    return initialFormData;
  });
  
  // Update form data when item changes
  useEffect(() => {
    if (!item) return;
    
    const currentVersionData = item.versions?.find(v => v.version === selectedVersion)?.data;
    if (currentVersionData) {
      setFormData(currentVersionData);
    } else if (item.versions?.length) {
      const latestVersion = item.versions[item.versions.length - 1];
      setSelectedVersion(latestVersion.version);
      setFormData(latestVersion.data);
    } else {
      setFormData(initialFormData);
    }
  }, [item, selectedVersion, initialFormData]);

  useEffect(() => {
    console.log('Item changed:', item);
    console.log('Current formData:', formData);
    console.log('Selected version:', selectedVersion);
  }, [item, formData, selectedVersion]);

  const versions = Array.isArray(item?.versions) 
    ? item.versions.map(v => ({
        value: v.version,
        label: v.version
      })) 
    : [{ value: 'v1.0', label: 'v1.0' }];

  // Add debug logging
  console.log('PersonaDetailsModal - item:', item);
  console.log('PersonaDetailsModal - versions:', versions);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
    const versionData = item?.versions?.find(v => v.version === version)?.data;
    if (versionData) {
      setFormData(versionData);
    } else {
      setFormData(initialFormData);
    }
  };

  const handleSave = async () => {
    if (!item?.id) return;
    
    setIsSaving(true);
    try {
      const currentVersion = item.versions?.find(v => v.version === selectedVersion);
      const updatedVersions: PersonaVersion[] = currentVersion
        ? (item.versions?.map(v => v.version === selectedVersion ? { version: v.version, data: formData } : v) || [])
        : [...(item.versions || []), { version: selectedVersion, data: formData }];
      
      const updateData: PersonaFormData = {
        ...formData,
        versions: updatedVersions
      };

      await onSave(item.id, updateData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewVersion = () => {
    const newVersion = `v${(parseFloat(selectedVersion.replace('v', '')) + 0.1).toFixed(1)}`;
    setSelectedVersion(newVersion);
    setFormData({
      ...formData,
      version: newVersion
    });
    setIsEditing(true);
  };

  const handleDelete = () => {
    console.log('Deleting:', item?.id);
    onClose();
  };

  const handleCancel = () => {
    if (!item?.id) {
      onClose();
      return;
    }
    setIsEditing(false);
  };

  const renderContent = () => {
    if (!item) return null;
    
    return isEditing ? (
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
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-3xl bg-[#FBF9FC]/95 backdrop-blur-md border-[#F58C5D]/20"
        aria-describedby="persona-modal-description"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-nord-bold text-[#383244]">
            {item?.name || ''}
          </DialogTitle>
          <DialogDescription id="persona-modal-description">
            Details and configuration for the {item?.name} persona
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6 p-2">
            {renderContent()}

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