import { useState } from 'react';
import { NavigationSidebar } from '@/components/navigation-sidebar';
import { SectionContainer } from '@/components/sections/section-container';
import { SectionGrid } from '@/components/sections/section-grid';
import { HomePage } from '@/components/home-page';
import { GradientLayout } from '@/components/layouts/gradient-layout';
import { usePersonas } from '@/hooks/use-personas';
import type { SectionId } from '@/constants/navigation';

function App() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const { personas } = usePersonas();

  const handleSectionSelect = (sectionId: SectionId) => {
    setActiveSection(sectionId);
  };

  const handleBackToHome = () => {
    setActiveSection(null);
  };

  if (!activeSection) {
    return <HomePage onSectionSelect={handleSectionSelect} />;
  }

  // Get items based on active section
  let items: any[] = [];
  let isLoading = false;

  if (activeSection === 'personas') {
    isLoading = personas.isLoading;
    if (!personas.isError) {
      items = personas.data || [];
    }
  }

  return (
    <GradientLayout>
      <div className="flex h-screen">
        <NavigationSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onBackToHome={handleBackToHome}
        />
        <main className="flex-1 overflow-auto">
          <SectionContainer>
            {personas.isError ? (
              <div className="flex items-center justify-center h-full text-red-500">
                Error: {personas.error?.message}
              </div>
            ) : (
              <SectionGrid
                title={activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                items={items}
                isLoading={isLoading}
              />
            )}
          </SectionContainer>
        </main>
      </div>
    </GradientLayout>
  );
}

export default App;