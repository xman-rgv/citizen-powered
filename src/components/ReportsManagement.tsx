import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Calendar,
  Users,
  Car,
  AlertTriangle,
  FileText,
  Download,
  ExternalLink
} from "lucide-react";

const ReportsManagement = () => {
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Mock reports data
  const allReports = [
    {
      id: "RPT001",
      type: "Signal Jump",
      location: "MG Road Junction",
      reportedBy: "Citizen #1234",
      reporterName: "Priya Sharma",
      time: "2024-01-15 14:30:25",
      status: "pending",
      priority: "high",
      vehicleNumber: "KA01AB1234",
      description: "Vehicle jumped red signal while pedestrians were crossing",
      imageUrl: "/api/placeholder/400/300",
      gpsCoords: "12.9716, 77.5946",
      aiVerification: {
        licensePlateDetected: true,
        faceBlurred: true,
        violationConfidence: 92,
        timestamps: ["14:30:22", "14:30:25", "14:30:28"]
      }
    },
    {
      id: "RPT002",
      type: "Illegal Parking",
      location: "Brigade Road",
      reportedBy: "Citizen #5678",
      reporterName: "Rajesh Kumar",
      time: "2024-01-15 13:45:12",
      status: "verified",
      priority: "medium",
      vehicleNumber: "KA02CD5678",
      description: "Car parked in no-parking zone blocking traffic flow",
      imageUrl: "/api/placeholder/400/300",
      gpsCoords: "12.9698, 77.6008",
      aiVerification: {
        licensePlateDetected: true,
        faceBlurred: true,
        violationConfidence: 88,
        timestamps: ["13:45:10", "13:45:12"]
      },
      challanGenerated: true,
      challanNumber: "CH001234"
    },
    {
      id: "RPT003",
      type: "Wrong Side Driving",
      location: "Commercial Street",
      reportedBy: "Citizen #9012",
      reporterName: "Anita Reddy",
      time: "2024-01-15 12:20:45",
      status: "rejected",
      priority: "high",
      vehicleNumber: "KA03EF9012",
      description: "Motorcycle driving on wrong side of divided road",
      imageUrl: "/api/placeholder/400/300",
      gpsCoords: "12.9667, 77.6088",
      aiVerification: {
        licensePlateDetected: false,
        faceBlurred: true,
        violationConfidence: 45,
        timestamps: ["12:20:43", "12:20:45"]
      },
      rejectionReason: "License plate not clearly visible"
    }
  ];

  const filteredReports = allReports.filter(report => {
    const matchesFilter = activeFilter === "all" || report.status === activeFilter;
    const matchesSearch = searchTerm === "" || 
      report.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleVerifyReport = (reportId: string) => {
    toast({
      title: "Report Verified",
      description: "Challan has been generated and sent to vehicle owner.",
    });
  };

  const handleRejectReport = (reportId: string) => {
    toast({
      title: "Report Rejected",
      description: "Report has been marked as invalid.",
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-warning bg-warning/20";
      case "verified": return "text-success bg-success/20";
      case "rejected": return "text-destructive bg-destructive/20";
      default: return "text-muted-foreground bg-muted/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive bg-destructive/20";
      case "medium": return "text-warning bg-warning/20";
      case "low": return "text-muted-foreground bg-muted/20";
      default: return "text-muted-foreground bg-muted/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-card/80 backdrop-blur-md border-border/50 p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search reports, vehicle numbers, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-input/80 border-border/50"
              />
            </div>
          </div>
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
      </Card>

      {/* Filter Tabs */}
      <Tabs value={activeFilter} onValueChange={setActiveFilter}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeFilter} className="mt-6">
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="bg-card/80 backdrop-blur-md border-border/50 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <Car className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-foreground">{report.type}</h3>
                        <Badge className={getPriorityColor(report.priority)}>
                          {report.priority.toUpperCase()} PRIORITY
                        </Badge>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Car className="w-4 h-4" />
                            <span className="font-mono text-primary">{report.vehicleNumber}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {report.location}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {report.reporterName}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {report.time}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <AlertTriangle className="w-4 h-4" />
                            AI Confidence: {report.aiVerification.violationConfidence}%
                          </div>
                          {report.challanGenerated && (
                            <div className="flex items-center gap-2 text-success">
                              <FileText className="w-4 h-4" />
                              Challan: {report.challanNumber}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedReport(report)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Report Details - {selectedReport?.id}</DialogTitle>
                        </DialogHeader>
                        {selectedReport && (
                          <div className="space-y-6">
                            {/* Report Image */}
                            <div className="relative">
                              <img 
                                src={selectedReport.imageUrl} 
                                alt="Evidence" 
                                className="w-full max-h-96 object-cover rounded-lg"
                              />
                              <Badge className="absolute top-2 right-2 bg-success/20 text-success">
                                Faces Blurred
                              </Badge>
                            </div>
                            
                            {/* AI Verification Details */}
                            <Card className="p-4">
                              <h4 className="font-semibold mb-3">AI Verification Results</h4>
                              <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span>License Plate Detection:</span>
                                    <Badge variant={selectedReport.aiVerification.licensePlateDetected ? "default" : "destructive"}>
                                      {selectedReport.aiVerification.licensePlateDetected ? "Detected" : "Not Detected"}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Face Blurring:</span>
                                    <Badge variant="default">Applied</Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Violation Confidence:</span>
                                    <Badge variant={selectedReport.aiVerification.violationConfidence > 80 ? "default" : "secondary"}>
                                      {selectedReport.aiVerification.violationConfidence}%
                                    </Badge>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <span className="text-muted-foreground">GPS Coordinates:</span>
                                    <p className="font-mono text-sm">{selectedReport.gpsCoords}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Timestamps:</span>
                                    <div className="flex gap-1 flex-wrap">
                                      {selectedReport.aiVerification.timestamps.map((time: string, idx: number) => (
                                        <Badge key={idx} variant="outline" className="text-xs">
                                          {time}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    {report.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-success hover:bg-success/80"
                          onClick={() => handleVerifyReport(report.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Verify
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRejectReport(report.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                    
                    {report.challanGenerated && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Challan
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsManagement;