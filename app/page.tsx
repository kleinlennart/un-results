
import { WordCarousel } from '@/components/WordCarousel';

// Reusable annotation component
function Annotation({ children, label }: { children: React.ReactNode, label: string }) {
  return (
    <span className="relative">
      {children}
      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap pointer-events-none" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {label}
      </span>
      <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-px h-4 bg-muted-foreground/50"></span>
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center w-full px-2">
        <div className="relative inline-block">
          <p className="text-foreground text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl 2xl:text-4xl tracking-wide sm:tracking-wider leading-relaxed whitespace-nowrap" style={{ fontFamily: 'Roboto Mono, monospace' }}>
            <strong>[UN ENTITY]</strong> <WordCarousel /> <Annotation label="Output Indicator">##</Annotation> <strong>[OUTPUT]</strong> resulting in <Annotation label="Outcome Indicator">###</Annotation> <strong>[OUTCOME]</strong>.
          </p>
        </div>
      </div>
    </main>
  );
}
