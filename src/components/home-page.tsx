import { PageTitle } from './home/page-title';
import { FeatureGrid } from './home/feature-grid';
import type { SectionId } from '@/constants/navigation';
import '../styles/home-gradient.css';

interface HomePageProps {
  onSectionSelect: (sectionId: SectionId) => void;
}

export function HomePage({ onSectionSelect }: HomePageProps) {
  return (
    <div className="min-h-screen home-gradient-bg relative overflow-hidden">
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