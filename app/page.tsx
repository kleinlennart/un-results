import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { WordCarousel } from '@/components/WordCarousel';
import { footerLinkStyle, hiddenLinkStyle, thesis } from '@/lib/site';

// Reusable annotation component
function Annotation({ children, label }: { children: React.ReactNode, label: string }) {
  return (
    <span className="relative">
      {children}
      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap pointer-events-none">
        {label}
      </span>
      <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-px h-4 bg-muted-foreground/50"></span>
    </span>
  );
}

// One line per clause on small screens, a single sentence from lg up
const clause = "block mt-10 first:mt-0 lg:inline lg:mt-0";

export default function Home() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center px-4">
        <p className="text-foreground text-base lg:text-lg xl:text-2xl 2xl:text-4xl tracking-wide sm:tracking-wider leading-relaxed lg:whitespace-nowrap">
          <span className={clause}><a className={hiddenLinkStyle} href="https://systemchart.un.org"><strong>[UN ENTITY]</strong></a></span>{' '}
          <span className={clause}><WordCarousel /> <Annotation label="Output Indicator">##</Annotation> <a className={hiddenLinkStyle} href="https://results.un.org"><strong>[OUTPUT]</strong></a></span>{' '}
          <span className={clause}>resulting in <Annotation label="Outcome Indicator">##</Annotation> <span className="sr-only">blank</span><span aria-hidden="true" className="inline-block w-[8ch] h-0.5 bg-current animate-blink motion-reduce:animate-none"></span></span>
        </p>
      </main>
      <Footer>
        <p>{thesis}</p>
        <Link href="/about" className={footerLinkStyle}>about</Link>
      </Footer>
    </>
  );
}
