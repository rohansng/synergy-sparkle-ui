import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Calendar, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string;
    progress: number;
    totalTasks: number;
    completedTasks: number;
    members: number;
    dueDate?: string;
    status: "active" | "completed" | "on-hold";
  };
  onClick: () => void;
  className?: string;
}

export const ProjectCard = ({ project, onClick, className }: ProjectCardProps) => {
  const statusColors = {
    active: "bg-primary text-primary-foreground",
    completed: "bg-success text-success-foreground",
    "on-hold": "bg-warning text-warning-foreground"
  };

  const statusLabels = {
    active: "Active",
    completed: "Completed",
    "on-hold": "On Hold"
  };

  return (
    <Card 
      className={cn(
        "bg-gradient-card hover-lift cursor-pointer border-border/50 animate-fade-in",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-card-foreground line-clamp-1">
              {project.name}
            </h3>
            {project.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            )}
          </div>
          <Badge 
            className={cn("ml-3", statusColors[project.status])}
            variant="secondary"
          >
            {statusLabels[project.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>{project.completedTasks}/{project.totalTasks} tasks</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{project.members} members</span>
          </div>
        </div>
        
        {project.dueDate && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};