import { useState } from 'react';
import { Entity, EntityVersion } from '../../../types/entities';
import { INITIAL_VERSION } from '../types';

interface UsePersonaFormProps {
  name?: string;
  version?: string;
  description?: string;
  mainObjective?: string;
  systemPrompt?: string;
  userPromptTemplate?: string;
  notes?: string;
  picture?: string;
  versions?: EntityVersion[];
}

export function usePersonaForm(initialData?: UsePersonaFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(initialData?.version || INITIAL_VERSION);
  const [isSaving, setIsSaving] = useState(false);
  
  const currentVersionData = initialData?.versions?.find(v => v.version === selectedVersion)?.data || {
    name: initialData?.name || '',
    version: selectedVersion,
    description: initialData?.description || '',
    mainObjective: initialData?.mainObjective || '',
    systemPrompt: initialData?.systemPrompt || '',
    userPromptTemplate: initialData?.userPromptTemplate || '',
    notes: initialData?.notes || '',
    picture: initialData?.picture || '',
  };

  const [formData, setFormData] = useState<Omit<Entity, 'id' | 'versions'>>(currentVersionData);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
    const versionData = initialData?.versions?.find(v => v.version === version)?.data;
    if (versionData) {
      setFormData(versionData);
    }
  };

  return {
    isEditing,
    setIsEditing,
    selectedVersion,
    setSelectedVersion,
    isSaving,
    setIsSaving,
    formData,
    setFormData,
    handleChange,
    handleVersionChange,
  };
}