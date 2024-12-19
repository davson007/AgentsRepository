import { ModalSection } from './sections/modal-section';
import { VersionSelector } from './version-selector';
import { CopyButton } from "@/components/ui/copy-button";
import { Entity } from '@/types/entities';
import '@/styles/fonts.css';

interface ToolViewProps {
  data: Entity;
  versions: Array<{
    value: string;
    label: string;
  }>;
  currentVersion: string;
  onVersionChange: (version: string) => void;
}

export function ToolView({ data, versions, currentVersion, onVersionChange }: ToolViewProps) {

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <ModalSection title="Tool Name">
          <p className="text-base font-fougie text-[#383244]">{data.name}</p>
        </ModalSection>

        <ModalSection title="Version">
          <VersionSelector
            versions={versions}
            currentVersion={currentVersion}
            onVersionChange={onVersionChange}
          />
        </ModalSection>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ModalSection 
          title="Description"
          headerContent={
            <CopyButton 
              text={data.description}
              className="h-5 w-5 text-[#383244]/70 hover:text-[#F58C5D]"
            />
          }
        >
          <p className="text-base font-fougie text-[#383244] whitespace-pre-wrap">
            {data.description}
          </p>
        </ModalSection>

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
      </div>

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

      <ModalSection title="Code Type">
        <p className="text-base font-fougie text-[#383244]">
          {data.codeType ? data.codeType.charAt(0).toUpperCase() + data.codeType.slice(1) : 'Other'}
        </p>
      </ModalSection>

      <ModalSection 
        title="Code"
        headerContent={
          <CopyButton 
            text={data.code}
            className="h-5 w-5 text-[#383244]/70 hover:text-[#F58C5D]"
          />
        }
      >
        <p className="text-base font-fougie text-[#383244] whitespace-pre-wrap">
          {data.code}
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