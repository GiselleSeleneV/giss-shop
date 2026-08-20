import { cn } from "@/lib/utils";

interface PageEnterProps {
  children: React.ReactNode;
  className?: string;
}

export const PageEnter = ({ children, className }: PageEnterProps) => {
  return <div className={cn("animate-page-in", className)}>{children}</div>;
};
