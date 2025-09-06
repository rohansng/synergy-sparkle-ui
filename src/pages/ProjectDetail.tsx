import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TaskCard } from "@/components/SynergySphere/TaskCard";
import { FloatingActionButton } from "@/components/SynergySphere/FloatingActionButton";
import { ArrowLeft, Users, Calendar, CheckCircle2, Plus, MessageSquare, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock data
const mockProject = {
  id: "1",
  name: "Website Redesign",
  description: "Complete overhaul of the company website with modern UI/UX design principles and enhanced user experience.",
  progress: 75,
  totalTasks: 24,
  completedTasks: 18,
  members: [
    { id: "1", name: "John Doe", role: "Project Manager" },
    { id: "2", name: "Sarah Wilson", role: "UI/UX Designer" },
    { id: "3", name: "Mike Johnson", role: "Frontend Developer" },
    { id: "4", name: "Emily Davis", role: "Backend Developer" },
    { id: "5", name: "Alex Chen", role: "QA Engineer" }
  ],
  dueDate: "2024-01-15",
  status: "active" as const
};

const mockTasks = [
  {
    id: "1",
    title: "Design homepage wireframes",
    description: "Create low-fidelity wireframes for the new homepage layout",
    status: "done" as const,
    priority: "high" as const,
    assignee: { name: "Sarah Wilson" },
    dueDate: "2024-01-10",
    tags: ["Design", "Wireframes"]
  },
  {
    id: "2",
    title: "Implement responsive navigation",
    description: "Build mobile-first responsive navigation component",
    status: "in-progress" as const,
    priority: "high" as const,
    assignee: { name: "Mike Johnson" },
    dueDate: "2024-01-12",
    tags: ["Development", "Frontend"]
  },
  {
    id: "3",
    title: "Set up authentication system",
    description: "Implement user login and registration functionality",
    status: "todo" as const,
    priority: "medium" as const,
    assignee: { name: "Emily Davis" },
    dueDate: "2024-01-15",
    tags: ["Backend", "Auth"]
  },
  {
    id: "4",
    title: "Create design system documentation",
    description: "Document color palette, typography, and component guidelines",
    status: "in-progress" as const,
    priority: "medium" as const,
    assignee: { name: "Sarah Wilson" },
    dueDate: "2024-01-14",
    tags: ["Design", "Documentation"]
  },
  {
    id: "5",
    title: "Performance optimization",
    description: "Optimize images and implement lazy loading",
    status: "todo" as const,
    priority: "low" as const,
    assignee: { name: "Mike Johnson" },
    dueDate: "2024-01-20",
    tags: ["Performance", "Optimization"]
  }
];

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tasks");
  const [tasks, setTasks] = useState(mockTasks);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/");
    }
  }, [navigate]);

  const handleTaskClick = (taskId: string) => {
    navigate(`/project/${projectId}/task/${taskId}`);
  };

  const handleCreateTask = () => {
    navigate(`/project/${projectId}/create-task`);
  };

  const tasksByStatus = {
    todo: tasks.filter(task => task.status === "todo"),
    "in-progress": tasks.filter(task => task.status === "in-progress"),
    done: tasks.filter(task => task.status === "done")
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-card border-b border-border/50 shadow-soft sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-display text-foreground">{mockProject.name}</h1>
              <p className="text-sm text-muted-foreground">{mockProject.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Project Overview */}
      <div className="bg-gradient-soft border-b border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4" />
                Progress
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{mockProject.completedTasks}/{mockProject.totalTasks} tasks</span>
                  <span className="font-medium">{mockProject.progress}%</span>
                </div>
                <Progress value={mockProject.progress} className="h-2" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                Team
              </div>
              <div className="flex -space-x-2">
                {mockProject.members.slice(0, 4).map((member, index) => (
                  <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {mockProject.members.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">
                      +{mockProject.members.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Due Date
              </div>
              <p className="font-medium">
                {new Date(mockProject.dueDate).toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Settings className="w-4 h-4" />
                Status
              </div>
              <Badge className="bg-primary text-primary-foreground">
                Active
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* To Do Column */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">To Do</h3>
                  <Badge variant="outline" className="bg-muted text-muted-foreground">
                    {tasksByStatus.todo.length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {tasksByStatus.todo.map((task, index) => (
                    <div 
                      key={task.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <TaskCard task={task} onClick={() => handleTaskClick(task.id)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">In Progress</h3>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {tasksByStatus["in-progress"].length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {tasksByStatus["in-progress"].map((task, index) => (
                    <div 
                      key={task.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <TaskCard task={task} onClick={() => handleTaskClick(task.id)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Done Column */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Done</h3>
                  <Badge variant="outline" className="bg-success/10 text-success">
                    {tasksByStatus.done.length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {tasksByStatus.done.map((task, index) => (
                    <div 
                      key={task.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <TaskCard task={task} onClick={() => handleTaskClick(task.id)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Discussions Coming Soon
              </h3>
              <p className="text-muted-foreground">
                Team discussions and project updates will be available here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockProject.members.map((member, index) => (
                <div 
                  key={member.id}
                  className="bg-gradient-card p-4 rounded-lg border border-border/50 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-foreground">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Floating Action Button */}
      {activeTab === "tasks" && (
        <FloatingActionButton 
          onClick={handleCreateTask}
          label="Create new task"
        />
      )}
    </div>
  );
};

export default ProjectDetail;