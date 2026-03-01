interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionHeading({ title, subtitle, id }: SectionHeadingProps) {
  return (
    <div className="text-center mb-16">
      <h2
        id={id}
        className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 scroll-mt-24"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
