interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className = "" }: Readonly<GlowCardProps>) {
  return (
    <div
      className={`bg-bg-card border border-border-primary rounded-[14px] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:bg-bg-card-hover transition-all duration-200 p-7 ${className}`}
    >
      {children}
    </div>
  );
}
