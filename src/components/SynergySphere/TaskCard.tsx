import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    status: "todo" | "in-progress" | "done";
    priority: "low" | "medium" | "high";
    assignee?: {
      name: string;
      avatar?: string;
    };
    dueDate?: string;
    tags?: string[];
  };
  onClick: () => void;
  className?: string;
}

export const TaskCard = ({ task, onClick, className }: TaskCardProps) => {
  const statusColors = {
    todo: "bg-muted text-muted-foreground",
    "in-progress": "bg-primary text-primary-foreground",
    done: "bg-success text-success-foreground"
  };

  const priorityColors = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-warning text-warning-foreground",
    high: "bg-destructive text-destructive-foreground"
  };

  const statusLabels = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done"
  };

  const priorityLabels = {
    low: "Low",
    medium: "Medium",
    high: "High"
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done";
  
  return (
    <Card 
      className={cn(
        "bg-gradient-card hover-lift cursor-pointer border-border/50 animate-fade-in",
        isOverdue && "border-destructive/50",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h4 className="font-medium text-card-foreground line-clamp-2">
              {task.title}
            </h4>
            {task.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge 
            className={statusColors[task.status]}
            variant="secondary"
          >
            {statusLabels[task.status]}
          </Badge>
          <Badge 
            className={priorityColors[task.priority]}
            variant="outline"
          >
            {priorityLabels[task.priority]}
          </Badge>
        </div>

        {task.tags && task.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {task.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-xs bg-accent text-accent-foreground"
              >
                {tag}
              </Badge>
            ))}
            {task.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{task.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          {task.assignee && (
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {task.assignee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {task.assignee.name}
              </span>
            </div>
          )}

          {task.dueDate && (
            <div className={cn(
              "flex items-center gap-1 text-xs",
              isOverdue ? "text-destructive" : "text-muted-foreground"
            )}>
              {isOverdue ? <Clock className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
              <span>
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};