interface AdminTitleProps {
  title: string;
  description: string;
}

export const AdminTitle = ({ title, description }: AdminTitleProps) => {
  return (
    <div>
      <h1 className="font-montserrat text-xl sm:text-2xl font-light tracking-tight text-navy mb-2">
        {title}
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
