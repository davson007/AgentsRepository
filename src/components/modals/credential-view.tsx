import { ModalSection } from './sections/modal-section';
import { VersionSelector } from './version-selector';
import { CopyButton } from "@/components/ui/copy-button";
import { Credential } from '@/types/credentials';
import '@/styles/fonts.css';
import { format } from 'date-fns';

interface CredentialViewProps {
  data: Credential;
  versions: Array<{
    value: string;
    label: string;
  }>;
  currentVersion: string;
  onVersionChange: (version: string) => void;
}

export function CredentialView({ data, versions, currentVersion, onVersionChange }: CredentialViewProps) {

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <ModalSection title="Credential Name">
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
        <div>
          <ModalSection 
            title={
              <div className="flex items-center gap-2">
                <span>URL</span>
                <CopyButton value={data.url} />
              </div>
            }
          >
            <p className="text-base font-fougie text-[#383244]">{data.url}</p>
          </ModalSection>

          <ModalSection 
            title={
              <div className="flex items-center gap-2">
                <span>Key</span>
                <CopyButton value={data.key} />
              </div>
            } 
            className="mt-4"
          >
            <p className="text-base font-fougie text-[#383244]">••••••••</p>
          </ModalSection>
        </div>

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

      <ModalSection title="Description">
        <p className="text-base font-fougie text-[#383244] whitespace-pre-wrap">
          {data.description}
        </p>
      </ModalSection>

      <ModalSection title="Expires At">
        <p className="text-base font-fougie text-[#383244]">
          {data.expires_at ? format(new Date(data.expires_at), "PPP") : 'No expiration date'}
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