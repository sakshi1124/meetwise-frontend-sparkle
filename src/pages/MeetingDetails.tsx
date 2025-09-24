import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Upload, 
  FileVideo, 
  Download, 
  Clock, 
  Users, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Mock meeting data - will be replaced with backend API
const mockMeetingDetails: Record<string, any> = {
  "1": {
    id: 1,
    title: "Q4 Planning Meeting",
    date: "2024-03-15",
    time: "14:00",
    duration: "45 mins",
    participants: 8,
    status: "processed",
    fileUploaded: true,
    fileName: "q4_planning_meeting.mp4",
    fileSize: "125 MB",
    summary: {
      overview: "Quarterly planning session focusing on 2024 Q4 objectives, budget allocation, and team restructuring initiatives.",
      keyPoints: [
        "Budget approved for new marketing campaign ($150k)",
        "Product launch timeline moved to November 15th", 
        "New team lead positions to be filled by October 1st",
        "Q3 performance exceeded targets by 12%"
      ],
      actionItems: [
        { task: "Finalize marketing campaign strategy", assignee: "Sarah Johnson", deadline: "March 25, 2024" },
        { task: "Post job descriptions for team lead positions", assignee: "HR Team", deadline: "March 20, 2024" },
        { task: "Schedule product launch preparation meetings", assignee: "Product Team", deadline: "March 30, 2024" },
      ],
      importantDates: [
        { event: "Product Launch", date: "November 15, 2024" },
        { event: "Team Lead Hiring Deadline", date: "October 1, 2024" },
        { event: "Marketing Campaign Kickoff", date: "April 1, 2024" }
      ]
    }
  },
  "2": {
    id: 2,
    title: "Product Review Session",
    date: "2024-03-14", 
    time: "10:30",
    duration: "30 mins",
    participants: 5,
    status: "pending",
    fileUploaded: true,
    fileName: "product_review.mp4",
    fileSize: "89 MB",
    summary: null
  }
};

const MeetingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Get meeting data or create new meeting structure
  const meeting = id === 'new' ? null : mockMeetingDetails[id as string];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simulate upload progress
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload successful!",
            description: "Your meeting file is being processed. You'll be notified when the summary is ready.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownloadPDF = () => {
    // TODO: Connect to backend API to generate and download PDF
    toast({
      title: "Downloading...",
      description: "Your meeting summary PDF will be downloaded shortly.",
    });
  };

  if (id === 'new') {
    return (
      <div className="min-h-screen pt-16">
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <h1 className="text-3xl font-bold text-primary">Upload New Meeting</h1>
              <p className="text-muted-foreground mt-2">
                Upload your meeting recording to get an AI-powered summary with key insights.
              </p>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Meeting Recording
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <FileVideo className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload your meeting file</h3>
                  <p className="text-muted-foreground mb-6">
                    Supported formats: MP4, MOV, AVI, MP3, WAV, M4A<br />
                    Maximum file size: 500MB
                  </p>
                  
                  {isUploading ? (
                    <div className="space-y-4">
                      <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
                      <p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept="video/*,audio/*"
                        onChange={handleFileUpload}
                      />
                      <Button 
                        className="bg-ocean-gradient hover:scale-105 transition-transform duration-300"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Card className="glass-card text-center p-8">
          <AlertCircle className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Meeting not found</h2>
          <p className="text-muted-foreground mb-4">The meeting you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary">{meeting.title}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground mt-2">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {meeting.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {meeting.time} ({meeting.duration})
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {meeting.participants} participants
                  </div>
                </div>
              </div>
              
              <Badge className={
                meeting.status === 'processed' 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-secondary text-secondary-foreground'
              }>
                {meeting.status === 'processed' ? (
                  <CheckCircle className="mr-1 h-3 w-3" />
                ) : (
                  <Clock className="mr-1 h-3 w-3" />
                )}
                {meeting.status}
              </Badge>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* File Info */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileVideo className="mr-2 h-5 w-5" />
                    Meeting Recording
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Play className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">{meeting.fileName}</p>
                        <p className="text-sm text-muted-foreground">{meeting.fileSize}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      Play
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Report */}
              {meeting.status === 'processed' && meeting.summary && (
                <Card className="glass-card">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>AI-Generated Summary Report</CardTitle>
                    <Button onClick={handleDownloadPDF} className="hover-glass">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Overview */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-primary">Meeting Overview</h3>
                      <p className="text-muted-foreground">{meeting.summary.overview}</p>
                    </div>

                    <Separator />

                    {/* Key Points */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-primary">Key Discussion Points</h3>
                      <ul className="space-y-2">
                        {meeting.summary.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-accent mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    {/* Action Items */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-primary">Action Items</h3>
                      <div className="space-y-3">
                        {meeting.summary.actionItems.map((item, index) => (
                          <div key={index} className="p-3 border border-border/50 rounded-lg">
                            <p className="font-medium">{item.task}</p>
                            <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                              <span>Assigned to: {item.assignee}</span>
                              <span>Due: {item.deadline}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Important Dates */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-primary">Important Dates</h3>
                      <div className="space-y-2">
                        {meeting.summary.importantDates.map((dateItem, index) => (
                          <div key={index} className="flex justify-between items-center p-2 border border-border/50 rounded">
                            <span className="font-medium">{dateItem.event}</span>
                            <Badge variant="outline">{dateItem.date}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Processing Status */}
              {meeting.status === 'pending' && (
                <Card className="glass-card">
                  <CardContent className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold mb-2">Processing Your Meeting</h3>
                    <p className="text-muted-foreground">
                      Our AI is analyzing your meeting recording. This usually takes 2-5 minutes.
                      You'll receive a notification when the summary is ready.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Meeting Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className={
                      meeting.status === 'processed' 
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }>
                      {meeting.status}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{meeting.duration}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Participants</span>
                    <span>{meeting.participants} people</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">File Size</span>
                    <span>{meeting.fileSize}</span>
                  </div>
                </CardContent>
              </Card>

              {meeting.status === 'processed' && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start hover-glass">
                      Share Summary
                    </Button>
                    <Button variant="outline" className="w-full justify-start hover-glass">
                      Export to Calendar
                    </Button>
                    <Button variant="outline" className="w-full justify-start hover-glass">
                      Create Follow-up Meeting
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeetingDetails;