import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, Shield, Users, Car } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Hero section */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-primary/20 rounded-full backdrop-blur-sm border border-primary/30">
                <Eye className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-6xl font-bold text-foreground">Civic Eye</h1>
            </div>
            
            <p className="text-2xl text-muted-foreground mb-8">
              Building safer streets together through citizen-powered traffic monitoring
            </p>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Report traffic violations in real-time with AI verification. 
              Help reduce traffic challans and earn civic rewards for making roads safer.
            </p>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/")} 
              className="bg-gradient-accent hover:opacity-90 transition-all duration-300 shadow-glow px-8 py-6 text-lg"
            >
              <Users className="w-5 h-5 mr-2" />
              Get Started
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="border-border/50 px-8 py-6 text-lg"
            >
              <Shield className="w-5 h-5 mr-2" />
              Police Dashboard
            </Button>
          </div>

          {/* Features preview */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="text-center space-y-4 p-6 bg-card/50 backdrop-blur-md rounded-lg border border-border/30">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI Verification</h3>
              <p className="text-muted-foreground">
                Automatic license plate recognition and face blurring for privacy protection
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 bg-card/50 backdrop-blur-md rounded-lg border border-border/30">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <Car className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Real-time Reports</h3>
              <p className="text-muted-foreground">
                GPS tracking and timestamp verification for accurate violation documentation
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 bg-card/50 backdrop-blur-md rounded-lg border border-border/30">
              <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Civic Rewards</h3>
              <p className="text-muted-foreground">
                Earn points and reduce your traffic penalties through community participation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
