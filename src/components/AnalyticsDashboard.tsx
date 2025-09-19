import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle,
  Target,
  Activity,
  Zap,
  Download
} from "lucide-react";

const AnalyticsDashboard = () => {
  // Mock analytics data
  const violationTrends = [
    { type: "Signal Jump", thisMonth: 342, lastMonth: 298, trend: "up" },
    { type: "Illegal Parking", thisMonth: 298, lastMonth: 356, trend: "down" },
    { type: "Wrong Side Driving", thisMonth: 267, lastMonth: 234, trend: "up" },
    { type: "Overspeeding", thisMonth: 340, lastMonth: 387, trend: "down" }
  ];

  const hotspotAreas = [
    { area: "MG Road Junction", violations: 89, type: "Signal Jump", risk: "high" },
    { area: "Brigade Road", violations: 76, type: "Illegal Parking", risk: "high" },
    { area: "Commercial Street", violations: 67, type: "Wrong Side", risk: "medium" },
    { area: "Koramangala 5th Block", violations: 54, type: "Overspeeding", risk: "medium" },
    { area: "Indiranagar Main Road", violations: 43, type: "Signal Jump", risk: "low" }
  ];

  const timeBasedAnalytics = [
    { time: "6:00-9:00 AM", violations: 234, percentage: 28 },
    { time: "9:00-12:00 PM", violations: 156, percentage: 19 },
    { time: "12:00-3:00 PM", violations: 187, percentage: 22 },
    { time: "3:00-6:00 PM", violations: 198, percentage: 24 },
    { time: "6:00-9:00 PM", violations: 89, percentage: 11 },
    { time: "9:00 PM-6:00 AM", violations: 45, percentage: 5 }
  ];

  const citizenAnalytics = {
    activeReporters: 456,
    totalReports: 1247,
    averageAccuracy: 94,
    topReporter: "Priya Sharma",
    reportsGrowth: 23
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-destructive bg-destructive/20";
      case "medium": return "text-warning bg-warning/20";
      case "low": return "text-success bg-success/20";
      default: return "text-muted-foreground bg-muted/20";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? 
      <TrendingUp className="w-4 h-4 text-destructive" /> : 
      <TrendingUp className="w-4 h-4 text-success rotate-180" />;
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/80 backdrop-blur-md border-border/50 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">94%</p>
              <p className="text-sm text-muted-foreground">Avg Accuracy</p>
            </div>
          </div>
        </Card>

        <Card className="bg-card/80 backdrop-blur-md border-border/50 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/20 rounded-lg">
              <Zap className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">2.3min</p>
              <p className="text-sm text-muted-foreground">Avg Response</p>
            </div>
          </div>
        </Card>

        <Card className="bg-card/80 backdrop-blur-md border-border/50 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/20 rounded-lg">
              <Target className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Hotspots</p>
            </div>
          </div>
        </Card>

        <Card className="bg-card/80 backdrop-blur-md border-border/50 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/20 rounded-lg">
              <Users className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{citizenAnalytics.activeReporters}</p>
              <p className="text-sm text-muted-foreground">Active Citizens</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Violation Trends */}
      <Card className="bg-card/80 backdrop-blur-md border-border/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Violation Trends</h3>
              <p className="text-sm text-muted-foreground">Month-over-month comparison</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="space-y-4">
          {violationTrends.map((violation, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">{violation.type}</span>
                  {getTrendIcon(violation.trend)}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">
                    Last: {violation.lastMonth}
                  </span>
                  <span className="font-medium text-foreground">
                    This: {violation.thisMonth}
                  </span>
                  <Badge variant={violation.trend === "up" ? "destructive" : "default"}>
                    {violation.trend === "up" ? "+" : ""}
                    {((violation.thisMonth - violation.lastMonth) / violation.lastMonth * 100).toFixed(1)}%
                  </Badge>
                </div>
              </div>
              <Progress 
                value={(violation.thisMonth / Math.max(...violationTrends.map(v => v.thisMonth))) * 100} 
                className="h-2" 
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Time-based Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 backdrop-blur-md border-border/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Peak Hours Analysis</h3>
              <p className="text-sm text-muted-foreground">Violation patterns by time</p>
            </div>
          </div>

          <div className="space-y-4">
            {timeBasedAnalytics.map((timeSlot, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">{timeSlot.time}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{timeSlot.violations} violations</span>
                    <Badge variant="outline">{timeSlot.percentage}%</Badge>
                  </div>
                </div>
                <Progress value={timeSlot.percentage * 3.57} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-card/80 backdrop-blur-md border-border/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-warning/20 rounded-lg">
              <MapPin className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Violation Hotspots</h3>
              <p className="text-sm text-muted-foreground">High-risk areas requiring attention</p>
            </div>
          </div>

          <div className="space-y-3">
            {hotspotAreas.map((hotspot, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{hotspot.area}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{hotspot.violations} violations</span>
                    <span>•</span>
                    <span>{hotspot.type}</span>
                  </div>
                </div>
                <Badge className={getRiskColor(hotspot.risk)}>
                  {hotspot.risk.toUpperCase()} RISK
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Citizen Engagement */}
      <Card className="bg-card/80 backdrop-blur-md border-border/50 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-success/20 rounded-lg">
            <Users className="w-6 h-6 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Citizen Engagement Metrics</h3>
            <p className="text-sm text-muted-foreground">Community participation statistics</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{citizenAnalytics.activeReporters}</p>
            <p className="text-sm text-muted-foreground">Active Reporters</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">{citizenAnalytics.totalReports}</p>
            <p className="text-sm text-muted-foreground">Total Reports</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-8 h-8 text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground">{citizenAnalytics.averageAccuracy}%</p>
            <p className="text-sm text-muted-foreground">Avg Accuracy</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-8 h-8 text-destructive" />
            </div>
            <p className="text-2xl font-bold text-foreground">+{citizenAnalytics.reportsGrowth}%</p>
            <p className="text-sm text-muted-foreground">Growth</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">Top Contributor</p>
              <p className="text-sm text-muted-foreground">
                {citizenAnalytics.topReporter} leads with 89 verified reports this month
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;