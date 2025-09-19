import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Shield, Users, MapPin, TrendingUp } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (userType: string) => {
    // Demo login logic - in real app would integrate with Supabase auth
    if (userType === "citizen") {
      navigate("/citizen");
    } else {
      navigate("/police");
    }
  };

  const useDemoCredentials = () => {
    setEmail("demo@civiceye.com");
    setPassword("demo123");
  };

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/20 rounded-full backdrop-blur-sm border border-primary/30">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">Civic Eye</h1>
            </div>
            <p className="text-muted-foreground text-lg">Building safer streets together</p>
          </div>

          {/* Login card */}
          <Card className="bg-card/80 backdrop-blur-md border-border/50 shadow-card">
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="citizen" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Citizen
                  </TabsTrigger>
                  <TabsTrigger value="police" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Police
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="citizen" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-input/80 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-input/80 border-border/50"
                    />
                  </div>
                  <Button 
                    onClick={() => handleSignIn("citizen")} 
                    className="w-full bg-gradient-accent hover:opacity-90 transition-all duration-300 shadow-glow"
                  >
                    Sign In as Citizen
                  </Button>
                </TabsContent>

                <TabsContent value="police" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-input/80 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-input/80 border-border/50"
                    />
                  </div>
                  <Button 
                    onClick={() => handleSignIn("police")} 
                    className="w-full bg-secondary hover:bg-secondary/80 transition-all duration-300"
                  >
                    Sign In as Officer
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <Button 
                  variant="ghost" 
                  onClick={useDemoCredentials}
                  className="text-primary hover:text-primary-glow transition-colors"
                >
                  Use Demo Credentials
                </Button>
              </div>
            </div>
          </Card>

          {/* Features preview */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Real-time GPS</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">AI Verification</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Smart Analytics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;