import { PageTitle } from './home/page-title';
import { FeatureGrid } from './home/feature-grid';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import type { SectionId } from '@/constants/navigation';
import '../styles/home-gradient.css';

interface HomePageProps {
  onSectionSelect: (sectionId: SectionId) => void;
}

export function HomePage({ onSectionSelect }: HomePageProps) {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "Successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen home-gradient-bg relative overflow-hidden">
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-gray-300 hover:text-white hover:bg-red-600/90"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      <div className="relative z-10">
        <PageTitle title="Agents Repository" />
        <div className="flex items-center min-h-[calc(100vh-120px)]">
          <div className="max-w-[1600px] mx-auto px-8 w-full">
            <FeatureGrid onSectionSelect={onSectionSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}