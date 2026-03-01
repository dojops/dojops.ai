interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
  return (
    <div
      className={`glow-card rounded-xl border border-glass-border bg-surface/80 backdrop-blur-sm p-6 ${className}`}
    >
      {children}
    </div>
  );
}
