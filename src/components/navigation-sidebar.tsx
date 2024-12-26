import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navigationSections, type SectionId } from "@/constants/navigation";
import '@/styles/fonts.css';

interface NavigationSidebarProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
  onBackToHome: () => void;
}

export function NavigationSidebar({ 
  activeSection, 
  onSectionChange,
  onBackToHome 
}: NavigationSidebarProps) {
  return (
    <div className="w-64 border-r border-white/10 h-screen p-4 flex flex-col bg-black/20">
      <div className="space-y-2">
        {navigationSections.map(({ id, icon: Icon, label }) => (
          <Button
            key={id}
            variant={activeSection === id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2 font-nord-regular",
              activeSection === id 
                ? "bg-white/10 text-white hover:bg-white/20" 
                : "text-[#F5DEAE] hover:text-white hover:bg-white/10"
            )}
            onClick={() => onSectionChange(id)}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
            <ChevronRight className="ml-auto h-4 w-4" />
          </Button>
        ))}
      </div>

      <Button
        variant="ghost"
        className="w-full justify-start gap-2 text-[#F5DEAE] font-nord-regular hover:text-white hover:bg-white/10 mt-auto"
        onClick={onBackToHome}
      >
        <Home className="h-4 w-4" />
        <span>Back to Home</span>
      </Button>
    </div>
  );
}