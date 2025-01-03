import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavigationSidebar } from '@/components/navigation-sidebar';
import { SectionContainer } from '@/components/sections/section-container';
import { SectionGrid } from '@/components/sections/section-grid';
import { HomePage } from '@/components/home-page';
import { GradientLayout } from '@/components/layouts/gradient-layout';
import { usePersonas } from '@/features/personas';
import { useAgents } from '@/features/personas/hooks/use-agents';
import { useTools } from '@/features/personas/hooks/use-tools';
import { useCredentials } from '@/features/personas/hooks/use-credentials';
import { ProtectedRoute } from '@/components/protected-route';
import { LoginPage } from '@/components/login';
import type { SectionId } from '@/constants/navigation';

function MainApp() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const { personas } = usePersonas();
  const { agents } = useAgents();
  const { tools } = useTools();
  const { credentials } = useCredentials();

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
  let error = null;

  if (activeSection === 'personas') {
    isLoading = personas?.isLoading ?? false;
    error = personas?.error;
    if (personas?.data && !personas.isError) {
      items = personas.data;
    }
  } else if (activeSection === 'agents') {
    isLoading = agents?.isLoading ?? false;
    error = agents?.error;
    if (agents?.data && !agents.isError) {
      items = agents.data;
    }
  } else if (activeSection === 'tools') {
    isLoading = tools?.isLoading ?? false;
    error = tools?.error;
    if (tools?.data && !tools.isError) {
      items = tools.data;
    }
  } else if (activeSection === 'credentials') {
    isLoading = credentials?.isLoading ?? false;
    error = credentials?.error;
    if (credentials?.data && !credentials.isError) {
      items = credentials.data.map(cred => ({
        ...cred,
        isFavorite: cred.is_favorite,
        mainObjective: '',
        systemPrompt: '',
        userPromptTemplate: '',
        versions: cred.versions || []
      }));
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
            {error ? (
              <div className="flex items-center justify-center h-full text-red-500">
                Error: {error.message}
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

function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainApp />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;