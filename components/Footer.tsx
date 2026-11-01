export function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer className="flex items-end justify-between gap-6 p-4 text-xs text-muted-foreground">
      {children}
    </footer>
  );
}
