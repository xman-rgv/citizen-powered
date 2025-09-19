import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Camera, 
  MapPin, 
  Clock, 
  Upload, 
  CheckCircle,
  AlertTriangle,
  FileImage,
  Loader2
} from "lucide-react";

const ReportForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState("Detecting location...");
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const violationTypes = [
    { value: "signal-jump", label: "Signal Jump", points: 75 },
    { value: "illegal-parking", label: "Illegal Parking", points: 50 },
    { value: "wrong-side", label: "Wrong Side Driving", points: 100 },
    { value: "overspeeding", label: "Overspeeding", points: 80 },
    { value: "no-helmet", label: "No Helmet", points: 60 },
    { value: "mobile-driving", label: "Mobile While Driving", points: 90 }
  ];

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd use reverse geocoding here
          setLocation(`${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`);
          setIsGettingLocation(false);
        },
        () => {
          setLocation("Unable to get location");
          setIsGettingLocation(false);
        }
      );
    } else {
      setLocation("Geolocation not supported");
      setIsGettingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const points = violationTypes.find(v => v.value === selectedViolation)?.points || 0;

    toast({
      title: "Report Submitted Successfully!",
      description: `Your report has been submitted for AI verification. You'll earn ${points} points once verified.`,
    });

    // Reset form
    setSelectedViolation("");
    setDescription("");
    setSelectedImage(null);
    setImagePreview(null);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/80 backdrop-blur-md border-border/50 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Report Traffic Violation</h2>
            <p className="text-sm text-muted-foreground">Help make roads safer by reporting violations</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Violation Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Violation Type *</label>
            <Select value={selectedViolation} onValueChange={setSelectedViolation}>
              <SelectTrigger className="bg-input/80 border-border/50">
                <SelectValue placeholder="Select violation type" />
              </SelectTrigger>
              <SelectContent>
                {violationTypes.map((violation) => (
                  <SelectItem key={violation.value} value={violation.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{violation.label}</span>
                      <Badge variant="outline" className="ml-2 text-primary border-primary/30">
                        +{violation.points} XP
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Photo/Video Evidence *</label>
            <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
              {imagePreview ? (
                <div className="space-y-4">
                  <img 
                    src={imagePreview} 
                    alt="Selected evidence" 
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <div className="flex items-center justify-center gap-2 text-success">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Image selected</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <FileImage className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Upload photo or video evidence</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG, MP4 up to 10MB</p>
                  </div>
                  <label className="cursor-pointer">
                    <Button type="button" variant="outline" className="pointer-events-none">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="w-4 h-4" />
              <span>Faces will be automatically blurred for privacy protection</span>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Location</label>
            <div className="flex gap-2">
              <Input
                value={location}
                readOnly
                className="bg-input/80 border-border/50"
                placeholder="Getting location..."
              />
              <Button
                type="button"
                variant="outline"
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
              >
                {isGettingLocation ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center gap-2 text-xs text-success">
              <CheckCircle className="w-4 h-4" />
              <span>GPS coordinates and timestamp will be automatically recorded</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Additional Details</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide additional context about the violation (optional)"
              className="bg-input/80 border-border/50 min-h-[100px]"
            />
          </div>

          {/* Timestamp Display */}
          <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">
              Report timestamp: {new Date().toLocaleString()}
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!selectedViolation || !selectedImage || isSubmitting}
            className="w-full bg-gradient-accent hover:opacity-90 transition-all duration-300 shadow-glow"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting Report...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Submit Report
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* AI Verification Info */}
      <Card className="bg-card/80 backdrop-blur-md border-border/50 p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1">AI Verification Process</h3>
            <p className="text-sm text-muted-foreground">
              Your report will be automatically verified using AI for license plate recognition, 
              face blurring, and violation classification. Verified reports earn full points and 
              help reduce your traffic challan penalties.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReportForm;