import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ModalSection } from './sections/modal-section';
import '@/styles/fonts.css';

interface ItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    name: string;
    description: string;
    notes?: string;
    [key: string]: any;
  };
}

export function ItemDetailsModal({ isOpen, onClose, item }: ItemDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-3xl bg-[#FBF9FC]/95 backdrop-blur-md border-[#F58C5D]/20"
        aria-describedby="item-modal-description"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-nord-bold text-[#383244]">
            {item?.name || ''}
          </DialogTitle>
          <DialogDescription id="item-modal-description">
            Details and configuration for {item?.name}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            <ModalSection title="Description">
              <p className="text-base font-fougie text-[#383244]">{item.description}</p>
            </ModalSection>
            
            <Separator className="bg-[#383244]/10" />
            
            {Object.entries(item).map(([key, value]) => {
              if (['id', 'name', 'description', 'icon', 'notes'].includes(key)) return null;
              return (
                <ModalSection key={key} title={key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.slice(1)}>
                  <p className="text-base font-fougie text-[#383244] whitespace-pre-wrap">
                    {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
                  </p>
                </ModalSection>
              );
            })}

            {item.notes && (
              <>
                <Separator className="bg-[#383244]/10" />
                <ModalSection title="Notes">
                  <p className="text-base font-fougie text-[#383244] whitespace-pre-wrap">
                    {item.notes}
                  </p>
                </ModalSection>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}