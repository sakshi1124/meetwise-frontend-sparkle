import { useState } from "react";
import { Plus, FileVideo, Calendar, Clock, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Placeholder data - will be replaced with backend API calls
const mockMeetings = [
  {
    id: 1,
    title: "Q4 Planning Meeting",
    date: "2024-03-15",
    time: "14:00",
    duration: "45 mins",
    status: "processed",
    participants: 8,
  },
  {
    id: 2,
    title: "Product Review Session",
    date: "2024-03-14",
    time: "10:30",
    duration: "30 mins",
    status: "pending",
    participants: 5,
  },
  {
    id: 3,
    title: "Team Standup",
    date: "2024-03-13",
    time: "09:00",
    duration: "15 mins",
    status: "processed",
    participants: 12,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [meetings] = useState(mockMeetings);

  const handleMeetingClick = (meetingId: number) => {
    navigate(`/meeting/${meetingId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-accent text-accent-foreground';
      case 'pending':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-hero-gradient py-20">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6 float-animation">
            Meet<span className="text-accent">Wise</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your meeting recordings into actionable insights. Upload, process, and get 
            comprehensive summaries with key tasks and important dates automatically extracted.
          </p>
          <Button 
            size="lg" 
            className="bg-ocean-gradient hover:scale-105 transition-transform duration-300"
            onClick={() => navigate('/meeting/new')}
          >
            <Upload className="mr-2 h-5 w-5" />
            Upload New Meeting
          </Button>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Your Dashboard</h2>
            <Button 
              variant="outline" 
              className="hover-glass"
              onClick={() => navigate('/meeting/new')}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Meeting
            </Button>
          </div>

          {meetings.length === 0 ? (
            <Card className="glass-card text-center py-12">
              <CardContent>
                <FileVideo className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No meetings yet</h3>
                <p className="text-muted-foreground mb-4">
                  Upload your first meeting recording to get started with AI-powered summaries.
                </p>
                <Button 
                  className="bg-ocean-gradient"
                  onClick={() => navigate('/meeting/new')}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Meeting
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {meetings.map((meeting) => (
                <Card 
                  key={meeting.id} 
                  className="glass-card hover-glass cursor-pointer transition-all duration-300"
                  onClick={() => handleMeetingClick(meeting.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg leading-6">{meeting.title}</CardTitle>
                      <Badge className={getStatusColor(meeting.status)}>
                        {meeting.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {meeting.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {meeting.time} ({meeting.duration})
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span>{meeting.participants} participants</span>
                        {meeting.status === 'processed' && (
                          <Button size="sm" variant="ghost">
                            <Download className="h-3 w-3 mr-1" />
                            PDF
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;