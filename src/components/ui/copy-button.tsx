import { Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

interface CopyButtonProps {
  text?: string;
  value?: string;
  className?: string;
}

export function CopyButton({ text, value, className }: CopyButtonProps) {
  const contentToCopy = text || value || '';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className={className}
      onClick={handleCopy}
    >
      {copied ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}
