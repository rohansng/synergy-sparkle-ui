import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Clock, User, Tag, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockTask = {
  id: "1",
  title: "Design homepage wireframes",
  description: "Create low-fidelity wireframes for the new homepage layout. This includes defining the overall structure, content hierarchy, and user flow. The wireframes should focus on functionality and user experience rather than visual design details.",
  status: "done" as const,
  priority: "high" as const,
  assignee: { name: "Sarah Wilson" },
  dueDate: "2024-01-10",
  tags: ["Design", "Wireframes", "UX"],
  createdAt: "2024-01-05",
  updatedAt: "2024-01-08"
};

const TaskDetail = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(mockTask);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/");
    }
  }, [navigate]);

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

  const handleStatusChange = (newStatus: string) => {
    setTask(prev => ({ ...prev, status: newStatus as any }));
    toast({
      title: "Task updated",
      description: `Task status changed to ${statusLabels[newStatus as keyof typeof statusLabels]}`,
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-card border-b border-border/50 shadow-soft sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/project/${projectId}`)}
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-display text-foreground line-clamp-1">{task.title}</h1>
              <p className="text-sm text-muted-foreground">Task Details</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="hover:bg-muted/50"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Task Overview */}
          <Card className="bg-gradient-card border-border/50 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span className="flex-1">{task.title}</span>
                <div className="flex gap-2 ml-4">
                  <Badge className={statusColors[task.status]}>
                    {statusLabels[task.status]}
                  </Badge>
                  <Badge className={priorityColors[task.priority]} variant="outline">
                    {priorityLabels[task.priority]} Priority
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium text-foreground mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {task.description}
                </p>
              </div>

              {task.tags && task.tags.length > 0 && (
                <div>
                  <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {task.tags.map((tag, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="bg-accent text-accent-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Task Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status & Priority */}
            <Card className="bg-gradient-card border-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Status & Priority</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Status
                  </label>
                  <Select value={task.status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="bg-input border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border/50">
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Priority
                  </label>
                  <Badge className={priorityColors[task.priority]} variant="outline">
                    {priorityLabels[task.priority]} Priority
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Assignment & Dates */}
            <Card className="bg-gradient-card border-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Assignment & Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {task.assignee && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Assignee
                    </label>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {task.assignee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">{task.assignee.name}</span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Due Date
                  </label>
                  <div className={cn(
                    "flex items-center gap-2",
                    isOverdue ? "text-destructive" : "text-foreground"
                  )}>
                    {isOverdue && <Clock className="w-4 h-4" />}
                    <span>
                      {new Date(task.dueDate).toLocaleDateString()}
                      {isOverdue && " (Overdue)"}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Created: {new Date(task.createdAt).toLocaleDateString()}</div>
                  <div>Updated: {new Date(task.updatedAt).toLocaleDateString()}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              className="bg-gradient-primary hover:shadow-glow hover:scale-[1.02] transition-all duration-200"
              onClick={() => {
                toast({
                  title: "Feature coming soon",
                  description: "Task editing functionality will be available soon.",
                });
              }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Task
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate(`/project/${projectId}`)}
              className="border-border/50 hover:bg-muted/50"
            >
              Back to Project
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskDetail;

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}