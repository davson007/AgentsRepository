import { FeatureCard } from './feature-card';
import { type SectionId } from '@/constants/navigation';

interface FeatureGridProps {
  onSectionSelect: (sectionId: SectionId) => void;
}

const features = [
  {
    id: 'personas',
    title: 'AI Personas',
    image: new URL('../../assets/images/ai_personas.webp', import.meta.url).href,
  },
  {
    id: 'agents',
    title: 'AI Agents',
    image: new URL('../../assets/images/AI_Agents.webp', import.meta.url).href,
  },
  {
    id: 'tools',
    title: 'Tools',
    image: new URL('../../assets/images/AI_tools.webp', import.meta.url).href,
  },
  {
    id: 'credentials',
    title: 'API Credentials',
    image: new URL('../../assets/images/API_credential.webp', import.meta.url).href,
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