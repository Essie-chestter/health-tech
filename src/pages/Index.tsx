
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Bell, MessageSquare, Mail, Phone, Plus, Clock } from "lucide-react";
import { PatientList } from "@/components/PatientList";
import { AppointmentScheduler } from "@/components/AppointmentScheduler";
import { NotificationSettings } from "@/components/NotificationSettings";
import { ReminderDashboard } from "@/components/ReminderDashboard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for demonstration
  const stats = {
    totalPatients: 248,
    upcomingAppointments: 12,
    overdueFollowups: 3,
    remidersSent: 45
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "patients":
        return <PatientList />;
      case "appointments":
        return <AppointmentScheduler />;
      case "notifications":
        return <NotificationSettings />;
      case "reminders":
        return <ReminderDashboard />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalPatients}</div>
                  <p className="text-xs text-muted-foreground">Active in system</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.upcomingAppointments}</div>
                  <p className="text-xs text-muted-foreground">Next 7 days</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overdue Follow-ups</CardTitle>
                  <Clock className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{stats.overdueFollowups}</div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reminders Sent</CardTitle>
                  <Bell className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{stats.remidersSent}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common tasks to manage your follow-up system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("patients")}
                  >
                    <Users className="h-6 w-6" />
                    Add Patient
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("appointments")}
                  >
                    <Calendar className="h-6 w-6" />
                    Schedule Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("reminders")}
                  >
                    <Bell className="h-6 w-6" />
                    Send Reminder
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("notifications")}
                  >
                    <MessageSquare className="h-6 w-6" />
                    Setup Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system activities and reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Mail className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Email reminder sent</p>
                        <p className="text-sm text-muted-foreground">Sarah Johnson - Follow-up appointment</p>
                      </div>
                    </div>
                    <Badge variant="secondary">2 min ago</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Phone className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">SMS reminder sent</p>
                        <p className="text-sm text-muted-foreground">Michael Brown - Consultation tomorrow</p>
                      </div>
                    </div>
                    <Badge variant="secondary">15 min ago</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">WhatsApp reminder sent</p>
                        <p className="text-sm text-muted-foreground">Emma Davis - Lab results ready</p>
                      </div>
                    </div>
                    <Badge variant="secondary">1 hour ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FollowUp Pro</h1>
                <p className="text-sm text-gray-600">Healthcare Follow-up Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                System Active
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: Calendar },
              { id: "patients", label: "Patients", icon: Users },
              { id: "appointments", label: "Appointments", icon: Calendar },
              { id: "reminders", label: "Reminders", icon: Bell },
              { id: "notifications", label: "Settings", icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-4 border-b-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Index;
