interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
  return (
    <div
      className={`glow-card rounded-2xl border border-glass-border bg-surface/60 backdrop-blur-sm p-7 ${className}`}
    >
      {children}
    </div>
  );
}
