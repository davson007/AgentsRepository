import { FeatureCard } from './feature-card';
import { type SectionId } from '@/constants/navigation';

interface FeatureGridProps {
  onSectionSelect: (sectionId: SectionId) => void;
}

const features = [
  {
    id: 'personas',
    title: 'AI Personas',
    image: '/src/assets/images/ai_personas.webp',
  },
  {
    id: 'agents',
    title: 'AI Agents',
    image: '/src/assets/images/AI_Agents.webp',
  },
  {
    id: 'tools',
    title: 'Tools',
    image: '/src/assets/images/AI_tools.webp',
  },
  {
    id: 'credentials',
    title: 'API Credentials',
    image: '/src/assets/images/API_credential.webp',
  },
] as const;

export function FeatureGrid({ onSectionSelect }: FeatureGridProps) {
  return (
    <div className="flex justify-center items-start gap-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.id}
          image={feature.image}
          title={feature.title}
          onClick={() => onSectionSelect(feature.id)}
          className={index % 2 === 1 ? 'mt-32' : ''}
        />
      ))}
    </div>
  );
}