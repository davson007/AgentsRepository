import { ImageUpload } from './image-upload';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Entity } from '@/types/entities';
import '@/styles/fonts.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ToolFormProps {
  data: Entity;
  onChange: (field: string, value: string) => void;
}

export function ToolForm({ data, onChange }: ToolFormProps) {
  const inputClasses = "text-base font-sans bg-white/40";
  const labelClasses = "text-xs font-nord-book text-[#383244]/70";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className={labelClasses}>Tool Name</Label>
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
            />
          </div>
        </div>
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
        <Label className={labelClasses}>Main Objective</Label>
        <Textarea
          value={data.mainObjective}
          onChange={(e) => onChange('mainObjective', e.target.value)}
          className={`${inputClasses} min-h-[80px]`}
        />
      </div>

      <div className="space-y-1">
        <Label className={labelClasses}>Code Type</Label>
        <div className="w-1/3">
          <Select
            defaultValue="python"
            value={data.codeType || 'python'}
            onValueChange={(value) => onChange('codeType', value)}
          >
            <SelectTrigger className={inputClasses}>
              <SelectValue placeholder="Select code type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1">
        <Label className={labelClasses}>Code</Label>
        <Textarea
          value={data.code}
          onChange={(e) => onChange('code', e.target.value)}
          className={`${inputClasses} min-h-[120px]`}
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