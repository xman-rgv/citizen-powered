import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  BarChart3, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Eye,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import ReportsManagement from "@/components/ReportsManagement";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

const PoliceDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for police dashboard
  const dashboardStats = {
    totalReports: 1247,
    pendingReports: 89,
    verifiedReports: 1034,
    rejectedReports: 124,
    todayReports: 23,
    activeUsers: 456,
    hotspots: 12
  };

  const recentReports = [
    {
      id: "RPT001",
      type: "Signal Jump",
      location: "MG Road Junction",
      reportedBy: "Citizen #1234",
      time: "10 min ago",
      status: "pending",
      priority: "high",
      vehicleNumber: "KA01AB1234"
    },
    {
      id: "RPT002", 
      type: "Illegal Parking",
      location: "Brigade Road",
      reportedBy: "Citizen #5678",
      time: "25 min ago",
      status: "verified",
      priority: "medium",
      vehicleNumber: "KA02CD5678"
    },
    {
      id: "RPT003",
      type: "Wrong Side Driving",
      location: "Commercial Street",
      reportedBy: "Citizen #9012",
      time: "1 hour ago",
      status: "pending",
      priority: "high",
      vehicleNumber: "KA03EF9012"
    }
  ];

  const violationStats = [
    { type: "Signal Jump", count: 342, percentage: 27 },
    { type: "Illegal Parking", count: 298, percentage: 24 },
    { type: "Wrong Side Driving", count: 267, percentage: 21 },
    { type: "Overspeeding", count: 340, percentage: 28 }
  ];

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Civic Eye</h1>
              <p className="text-sm text-muted-foreground">Traffic Police Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-success/20 text-success">
              Officer Station: Koramangala
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card/80 backdrop-blur-md border-border/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{dashboardStats.totalReports}</p>
                    <p className="text-sm text-muted-foreground">Total Reports</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-card/80 backdrop-blur-md border-border/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/20 rounded-lg">
                    <Clock className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{dashboardStats.pendingReports}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-card/80 backdrop-blur-md border-border/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{dashboardStats.verifiedReports}</p>
                    <p className="text-sm text-muted-foreground">Verified</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-card/80 backdrop-blur-md border-border/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-destructive/20 rounded-lg">
                    <Calendar className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{dashboardStats.todayReports}</p>
                    <p className="text-sm text-muted-foreground">Today</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card className="bg-card/80 backdrop-blur-md border-border/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Recent Reports (Requires Action)
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        report.priority === 'high' ? 'bg-destructive/20' : 'bg-warning/20'
                      }`}>
                        <Badge variant={report.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                          {report.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{report.type}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {report.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {report.reportedBy}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {report.time}
                          </div>
                        </div>
                        <p className="text-sm font-mono text-primary">{report.vehicleNumber}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-success hover:bg-success/80">
                        Verify
                      </Button>
                      <Button size="sm" variant="destructive">
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Violation Types Statistics */}
            <Card className="bg-card/80 backdrop-blur-md border-border/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Violation Distribution
              </h3>
              <div className="space-y-4">
                {violationStats.map((violation, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium">{violation.type}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{violation.count} reports</span>
                        <Badge variant="outline">{violation.percentage}%</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-accent h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${violation.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Reports Management Tab */}
          <TabsContent value="reports">
            <ReportsManagement />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PoliceDashboard;