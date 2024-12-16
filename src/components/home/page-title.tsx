import '@/styles/fonts.css';

interface PageTitleProps {
  title: string;
}

export function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="pt-8 px-8">
      <h1 className="text-3xl font-nord-bold tracking-tight" style={{ color: '#F58C5D' }}>
        {title}
      </h1>
    </div>
  );
}