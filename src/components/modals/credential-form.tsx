import { ModalSection } from './sections/modal-section';
import { ImageUpload } from './image-upload';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Credential } from '@/types/credentials';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import '@/styles/fonts.css';

interface CredentialFormProps {
  data: Credential;
  onChange: (field: string, value: string) => void;
  isNewVersion?: boolean;
}

export function CredentialForm({ data, onChange, isNewVersion }: CredentialFormProps) {
  const inputClasses = "text-base font-sans bg-white/40";
  const labelClasses = "text-xs font-nord-book text-[#383244]/70";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className={labelClasses}>Name</Label>
          <Input
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            className={inputClasses}
          />
        </div>

        <div className="space-y-1">
          <Label className={labelClasses}>Version</Label>
          <div className="w-32">
            <Input
              value={data.version}
              onChange={(e) => onChange('version', e.target.value)}
              className={inputClasses}
              disabled={!isNewVersion}
            />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <Label className={labelClasses}>URL</Label>
        <Input
          value={data.url}
          onChange={(e) => onChange('url', e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className={labelClasses}>Description</Label>
          <Textarea
            value={data.description}
            onChange={(e) => onChange('description', e.target.value)}
            className={`${inputClasses} min-h-[80px]`}
          />
        </div>

        <ImageUpload
          currentImage={data.picture}
          onChange={(value) => onChange('picture', value)}
        />
      </div>

      <div className="space-y-1">
        <Label className={labelClasses}>Expires At</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${inputClasses}`}
            >
              {data.expires_at ? (
                format(new Date(data.expires_at), "PPP")
              ) : (
                <span className="text-muted-foreground">Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={data.expires_at ? new Date(data.expires_at) : undefined}
              onSelect={(date) => 
                onChange('expires_at', date ? date.toISOString() : '')
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-1">
        <Label className={labelClasses}>Key</Label>
        <Input
          type="password"
          value={data.key}
          onChange={(e) => onChange('key', e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="space-y-1">
        <Label className={labelClasses}>Notes</Label>
        <Textarea
          value={data.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Add any additional notes here..."
          className={`${inputClasses} min-h-[80px]`}
        />
      </div>
    </div>
  );
} 