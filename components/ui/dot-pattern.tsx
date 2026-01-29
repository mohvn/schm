import { cn } from "@/lib/utils";

interface DotPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional: override dot size via background-size (default 20px) */
  size?: number;
}

export function DotPattern({ className, size = 20, style, ...props }: DotPatternProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full dot-pattern text-muted-foreground/30", className)}
      style={{ ...style, backgroundSize: `${size}px ${size}px` }}
      {...props}
    />
  );
}
