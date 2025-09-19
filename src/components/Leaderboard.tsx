import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Trophy, 
  Medal, 
  Star, 
  Crown,
  TrendingUp,
  Award,
  Target
} from "lucide-react";

const Leaderboard = () => {
  // Mock leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      name: "Priya Sharma",
      points: 4250,
      reports: 89,
      accuracy: 96,
      level: "Traffic Hero",
      badges: ["Signal Spotter", "Parking Enforcer", "Speed Monitor", "Highway Guardian"]
    },
    {
      rank: 2,
      name: "Rajesh Kumar",
      points: 3890,
      reports: 76,
      accuracy: 94,
      level: "Traffic Guardian",
      badges: ["Signal Spotter", "Parking Enforcer", "Speed Monitor"]
    },
    {
      rank: 3,
      name: "Anita Reddy",
      points: 3650,
      reports: 72,
      accuracy: 95,
      level: "Traffic Guardian",
      badges: ["Parking Enforcer", "Speed Monitor"]
    },
    {
      rank: 4,
      name: "Vikram Singh",
      points: 3420,
      reports: 68,
      accuracy: 93,
      level: "Safety Advocate",
      badges: ["Signal Spotter", "Speed Monitor"]
    },
    {
      rank: 5,
      name: "Meera Patel",
      points: 3200,
      reports: 64,
      accuracy: 97,
      level: "Safety Advocate", 
      badges: ["Parking Enforcer", "Highway Guardian"]
    }
  ];

  const currentUser = {
    rank: 12,
    name: "You",
    points: 2150,
    reports: 47,
    accuracy: 91,
    level: "Traffic Guardian"
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-warning" />;
      case 2:
        return <Medal className="w-6 h-6 text-muted-foreground" />;
      case 3:
        return <Award className="w-6 h-6 text-destructive" />;
      default:
        return <Trophy className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-gray-600/20 border-gray-400/30";
      case 3:
        return "bg-gradient-to-r from-orange-600/20 to-red-500/20 border-orange-500/30";
      default:
        return "bg-card/80 border-border/50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Current User Stats */}
      <Card className="bg-gradient-to-r from-primary/20 to-primary-glow/20 border-primary/30 backdrop-blur-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-primary">#{currentUser.rank}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Your Ranking</h3>
                <p className="text-sm text-muted-foreground">{currentUser.level}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{currentUser.points}</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{currentUser.reports}</p>
              <p className="text-xs text-muted-foreground">Reports</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">{currentUser.accuracy}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Top Performers */}
      <Card className="bg-card/80 backdrop-blur-md border-border/50 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Top Citizens</h2>
            <p className="text-sm text-muted-foreground">Leading contributors this month</p>
          </div>
        </div>

        <div className="space-y-3">
          {leaderboardData.map((user, index) => (
            <div 
              key={user.rank} 
              className={`p-4 rounded-lg backdrop-blur-md border transition-all duration-300 hover:shadow-lg ${getRankColor(user.rank)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    {getRankIcon(user.rank)}
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/20 text-primary font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{user.name}</h3>
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                        {user.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {user.points} pts
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {user.reports} reports
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {user.accuracy}% accuracy
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex flex-wrap gap-1 justify-end mb-1">
                    {user.badges.slice(0, 2).map((badge, badgeIndex) => (
                      <Badge key={badgeIndex} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                    {user.badges.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{user.badges.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Rewards Information */}
      <Card className="bg-card/80 backdrop-blur-md border-border/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-success/20 rounded-lg">
            <Award className="w-6 h-6 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Reward System</h3>
            <p className="text-sm text-muted-foreground">Earn rewards for your contributions</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Point Values</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Signal Jump Report</span>
                <Badge variant="outline" className="text-primary">+75 XP</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wrong Side Driving</span>
                <Badge variant="outline" className="text-primary">+100 XP</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Illegal Parking</span>
                <Badge variant="outline" className="text-primary">+50 XP</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overspeeding</span>
                <Badge variant="outline" className="text-primary">+80 XP</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Benefits</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Traffic challan discounts up to 30%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Metro/bus pass discounts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span>Parking fee reductions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <span>Exclusive civic recognition</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Leaderboard;