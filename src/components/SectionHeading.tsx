interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionHeading({ title, subtitle, id }: SectionHeadingProps) {
  return (
    <div className="text-center mb-16 sm:mb-20">
      <h2
        id={id}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-5 scroll-mt-24 tracking-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
