import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
  label?: string;
}

export const FloatingActionButton = ({ 
  onClick, 
  className, 
  icon = <Plus className="w-6 h-6" />,
  label = "Add new"
}: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-primary shadow-large hover:shadow-glow hover:scale-105 transition-all duration-200 border-0 z-50",
        className
      )}
      aria-label={label}
    >
      {icon}
    </Button>
  );
};