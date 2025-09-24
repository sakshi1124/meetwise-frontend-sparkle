import { useState } from "react";
import { Camera, Download, Edit, FileVideo, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Mock user data - will be replaced with backend API
const mockUser = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@company.com",
  username: "sarahj",
  avatar: "",
  joinDate: "January 2024",
  totalMeetings: 15,
  processedHours: 24.5
};

const mockRecentMeetings = [
  { id: 1, title: "Q4 Planning Meeting", date: "2024-03-15", status: "processed" },
  { id: 2, title: "Product Review", date: "2024-03-14", status: "processed" },
  { id: 3, title: "Team Standup", date: "2024-03-13", status: "processed" },
  { id: 4, title: "Client Presentation", date: "2024-03-12", status: "pending" },
];

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    username: mockUser.username
  });

  const handleSave = () => {
    // TODO: Connect to backend API to update profile
    setUserData(prev => ({
      ...prev,
      ...formData
    }));
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getStatusColor = (status: string) => {
    return status === 'processed' 
      ? 'bg-accent text-accent-foreground' 
      : 'bg-secondary text-secondary-foreground';
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-hero-gradient py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{userData.name}</h1>
              <p className="text-muted-foreground">@{userData.username}</p>
              <p className="text-sm text-muted-foreground">Member since {userData.joinDate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="hover-glass"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={isEditing ? formData.name : userData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={isEditing ? formData.email : userData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={isEditing ? formData.username : userData.username}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Meetings */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileVideo className="mr-2 h-5 w-5" />
                    Recent Meetings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockRecentMeetings.map((meeting) => (
                      <div
                        key={meeting.id}
                        className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <h4 className="font-medium">{meeting.title}</h4>
                          <p className="text-sm text-muted-foreground">{meeting.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(meeting.status)}>
                            {meeting.status}
                          </Badge>
                          {meeting.status === 'processed' && (
                            <Button size="sm" variant="ghost">
                              <Download className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats & Settings */}
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Account Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Meetings</span>
                    <span className="font-semibold">{userData.totalMeetings}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hours Processed</span>
                    <span className="font-semibold">{userData.processedHours}h</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Type</span>
                    <Badge variant="outline">Premium</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start hover-glass">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover-glass">
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover-glass">
                    Notification Preferences
                  </Button>
                  <Separator />
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;