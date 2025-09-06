import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/SynergySphere/Logo";
import { ProjectCard } from "@/components/SynergySphere/ProjectCard";
import { FloatingActionButton } from "@/components/SynergySphere/FloatingActionButton";
import { Search, Plus, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock data
const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern UI/UX",
    progress: 75,
    totalTasks: 24,
    completedTasks: 18,
    members: 5,
    dueDate: "2024-01-15",
    status: "active" as const
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native iOS and Android app for customer engagement",
    progress: 45,
    totalTasks: 32,
    completedTasks: 14,
    members: 8,
    dueDate: "2024-02-28",
    status: "active" as const
  },
  {
    id: "3",
    name: "Marketing Campaign Q1",
    description: "Digital marketing strategy and execution for Q1 2024",
    progress: 100,
    totalTasks: 16,
    completedTasks: 16,
    members: 4,
    status: "completed" as const
  },
  {
    id: "4",
    name: "Infrastructure Migration",
    description: "Migrate legacy systems to cloud infrastructure",
    progress: 30,
    totalTasks: 28,
    completedTasks: 8,
    members: 6,
    dueDate: "2024-03-20",
    status: "on-hold" as const
  }
];

const Dashboard = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const handleCreateProject = () => {
    // For now, just navigate to the first project
    navigate("/project/1");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-card border-b border-border/50 shadow-soft sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-muted/50">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-popover border-border/50">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <Settings className="w-4 h-4 mr-2" />
                    Profile & Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-hero text-foreground">
                  Welcome back, {user.name.split(' ')[0]}
                </h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your projects today
                </p>
              </div>
              <Button 
                onClick={handleCreateProject}
                className="bg-gradient-primary hover:shadow-glow hover:scale-[1.02] transition-all duration-200 hidden sm:flex"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border/50"
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => handleProjectClick(project.id)}
                />
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? `No projects match "${searchQuery}". Try a different search term.`
                  : "You don't have any projects yet. Create your first project to get started."
                }
              </p>
              {!searchQuery && (
                <Button 
                  onClick={handleCreateProject}
                  className="bg-gradient-primary hover:shadow-glow hover:scale-[1.02] transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Project
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button for Mobile */}
      <FloatingActionButton 
        onClick={handleCreateProject}
        label="Create new project"
        className="sm:hidden"
      />
    </div>
  );
};

export default Dashboard;