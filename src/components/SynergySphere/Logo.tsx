import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo = ({ className, size = "md", showText = true }: LogoProps) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const textSizes = {
    sm: "text-sm font-semibold",
    md: "text-lg font-bold",
    lg: "text-2xl font-bold"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow",
        sizes[size]
      )}>
        <div className="w-full h-full rounded-xl bg-primary-foreground/20 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-3/5 h-3/5 text-primary-foreground"
          >
            <path
              d="M12 3L2 12L12 21L22 12L12 3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M8 12L12 8L16 12L12 16L8 12Z"
              fill="currentColor"
              fillOpacity="0.5"
            />
          </svg>
        </div>
      </div>
      {showText && (
        <span className={cn(
          "text-foreground tracking-tight",
          textSizes[size]
        )}>
          SynergySphere
        </span>
      )}
    </div>
  );
};