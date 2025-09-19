import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, 
  Home, 
  Trophy, 
  Upload, 
  MapPin, 
  Clock, 
  Award,
  Star,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Car,
  Ban,
  Navigation
} from "lucide-react";
import ReportForm from "@/components/ReportForm";
import Leaderboard from "@/components/Leaderboard";

const CitizenDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showReportForm, setShowReportForm] = useState(false);

  // Mock user data
  const userStats = {
    totalReports: 47,
    verifiedReports: 43,
    points: 2150,
    rank: 12,
    level: "Traffic Guardian",
    badges: ["Speed Monitor", "Parking Enforcer", "Signal Spotter"],
    recentReports: [
      { id: 1, type: "Illegal Parking", location: "MG Road", status: "verified", points: 50, time: "2 hours ago" },
      { id: 2, type: "Signal Jump", location: "Brigade Road", status: "pending", points: 75, time: "5 hours ago" },
      { id: 3, type: "Wrong Side Driving", location: "Commercial St", status: "verified", points: 100, time: "1 day ago" },
    ]
  };

  const violationTypes = [
    { type: "Signal Jump", icon: Ban, color: "text-destructive" },
    { type: "Illegal Parking", icon: Car, color: "text-warning" },
    { type: "Wrong Side Driving", icon: Navigation, color: "text-destructive" },
    { type: "Overspeeding", icon: TrendingUp, color: "text-warning" },
  ];

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Civic Eye</h1>
              <p className="text-sm text-muted-foreground">Citizen Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              Level: {userStats.level}
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Report
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card/80 backdrop-blur-md border-border/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Upload className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{userStats.totalReports}</p>
                    <p className="text-sm text-muted-foreground">Total Reports</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-card/80 backdrop-blur-md border-border/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{userStats.verifiedReports}</p>
                    <p className="text-sm text-muted-foreground">Verified</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-card/80 backdrop-blur-md border-border/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/20 rounded-lg">
                    <Star className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{userStats.points}</p>
                    <p className="text-sm text-muted-foreground">Points</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-card/80 backdrop-blur-md border-border/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-destructive/20 rounded-lg">
                    <Trophy className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">#{userStats.rank}</p>
                    <p className="text-sm text-muted-foreground">Rank</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Progress and Badges */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card/80 backdrop-blur-md border-border/50 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Progress to Next Level
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Traffic Guardian</span>
                    <span className="text-foreground">2150 / 3000 XP</span>
                  </div>
                  <Progress value={72} className="h-2" />
                  <p className="text-xs text-muted-foreground">850 XP to Traffic Hero</p>
                </div>
              </Card>

              <Card className="bg-card/80 backdrop-blur-md border-border/50 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Earned Badges
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userStats.badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className="border-primary/30 text-primary">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card className="bg-card/80 backdrop-blur-md border-border/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Reports
              </h3>
              <div className="space-y-3">
                {userStats.recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        report.status === 'verified' ? 'bg-success/20' : 'bg-warning/20'
                      }`}>
                        {report.status === 'verified' ? 
                          <CheckCircle className="w-4 h-4 text-success" /> :
                          <AlertTriangle className="w-4 h-4 text-warning" />
                        }
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{report.type}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {report.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">+{report.points} XP</p>
                      <p className="text-xs text-muted-foreground">{report.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Report Buttons */}
            <Card className="bg-card/80 backdrop-blur-md border-border/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Report</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {violationTypes.map((violation, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2 border-border/50"
                    onClick={() => {
                      setActiveTab("report");
                    }}
                  >
                    <violation.icon className={`w-6 h-6 ${violation.color}`} />
                    <span className="text-sm">{violation.type}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Report Tab */}
          <TabsContent value="report">
            <ReportForm />
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CitizenDashboard;