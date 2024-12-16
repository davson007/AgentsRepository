import { ModalSection } from './sections/modal-section';
import { CopyButton } from "@/components/ui/copy-button";
import type { PersonaFormData, PersonaVersion } from "@/types/personas";
import '@/styles/fonts.css';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface PersonaViewProps {
  data: PersonaFormData;
  versions: Version[];
  currentVersion: string;
  onVersionChange: (version: string) => void;
}

export function PersonaView({ data, versions = [], currentVersion, onVersionChange }: PersonaViewProps) {
  const sortedVersions = [...versions].sort((a, b) => {
    const aNum = parseFloat(a.version.replace('v', ''));
    const bNum = parseFloat(b.version.replace('v', ''));
    return bNum - aNum;
  });

  const versionOptions = sortedVersions.length > 0 
    ? sortedVersions.map(v => ({
        value: v.version,
        label: v.version
      }))
    : [{ value: currentVersion, label: currentVersion }];

  return (
    <div className="space-y-6">
      <ModalSection title="Version">
        <Select
          value={currentVersion}
          onValueChange={onVersionChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select version" />
          </SelectTrigger>
          <SelectContent>
            {versionOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ModalSection>

      <div className="grid grid-cols-2 gap-4">
        <ModalSection title="Persona Name">
          <p className="text-base font-fougie text-[#383244]">{data.name}</p>
        </ModalSection>

        <ModalSection title="Description">
          <p className="text-base font-fougie text-[#383244] whitespace-pre-wrap">
            {data.description}
          </p>
        </ModalSection>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ModalSection title="Picture">
          {data.picture ? (
            <div className="w-32 h-32 rounded-lg overflow-hidden">
              <img 
                src={data.picture} 
                alt={data.name} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 bg-white/50 rounded-lg flex items-center justify-center">
              <span className="text-base font-fougie text-[#383244]/50">
                No image
              </span>
            </div>
          )}
        </ModalSection>

        <ModalSection 
          title="Main Objective"
          headerContent={
            <CopyButton 
              text={data.mainObjective}
              className="h-5 w-5 text-[#383244]/70 hover:text-[#F58C5D]"
            />
          }
        >
          <p className="text-base font-fougie text-[#383244] whitespace-pre-wrap">
            {data.mainObjective}
          </p>
        </ModalSection>
      </div>

      <ModalSection 
        title="System Prompt"
        headerContent={
          <CopyButton 
            text={data.systemPrompt}
            className="h-5 w-5 text-[#383244]/70 hover:text-[#F58C5D]"
          />
        }
      >
        <p className="text-base font-fougie text-[#383244] whitespace-pre-wrap">
          {data.systemPrompt}
        </p>
      </ModalSection>

      <ModalSection 
        title="User Prompt Template"
        headerContent={
          <CopyButton 
            text={data.userPromptTemplate}
            className="h-5 w-5 text-[#383244]/70 hover:text-[#F58C5D]"
          />
        }
      >
        <p className="text-base font-fougie text-[#383244] whitespace-pre-wrap">
          {data.userPromptTemplate}
        </p>
      </ModalSection>

      <ModalSection title="Notes">
        <p className="text-base font-fougie text-[#383244] whitespace-pre-wrap">
          {data.notes || 'No notes added yet.'}
        </p>
      </ModalSection>
    </div>
  );
}