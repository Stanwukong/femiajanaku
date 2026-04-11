import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: "div" | "section" | "main" | "article";
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
  children: React.ReactNode;
  id?: string;
}

const SIZES = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-[var(--content-max)]",
  full: "max-w-screen-xl",
};

export function Container({
  as: Tag = "div",
  size = "lg",
  className,
  children,
  id,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn(
        SIZES[size],
        "mx-auto px-[var(--content-padding)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
