import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Version } from "@/types/personas";
import '@/styles/fonts.css';

interface VersionSelectorProps {
  versions: Version[];
  currentVersion: string;
  onVersionChange: (version: string) => void;
  className?: string;
}

export function VersionSelector({ 
  versions, 
  currentVersion, 
  onVersionChange,
  className 
}: VersionSelectorProps) {
  return (
    <div className="w-32">
      <Select value={currentVersion} onValueChange={onVersionChange}>
        <SelectTrigger className={`text-base font-fougie bg-white/50 ${className}`}>
          <SelectValue placeholder="Select version" />
        </SelectTrigger>
        <SelectContent>
          {versions.map((version) => (
            <SelectItem 
              key={version.value} 
              value={version.value}
              className="text-base font-fougie"
            >
              {version.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}