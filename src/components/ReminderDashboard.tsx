
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Send, Clock, Check, X, Mail, Phone, MessageSquare, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Reminder {
  id: string;
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  scheduledDate: string;
  channel: "email" | "sms" | "whatsapp";
  status: "pending" | "sent" | "delivered" | "failed";
  message: string;
}

export const ReminderDashboard = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");

  // Mock reminders data
  const [reminders] = useState<Reminder[]>([
    {
      id: "1",
      patientName: "Sarah Johnson",
      appointmentDate: "2024-02-15",
      appointmentTime: "10:00",
      scheduledDate: "2024-02-12",
      channel: "email",
      status: "sent",
      message: "Dear Sarah Johnson, this is a reminder for your upcoming appointment on 2024-02-15 at 10:00."
    },
    {
      id: "2",
      patientName: "Michael Brown",
      appointmentDate: "2024-02-10",
      appointmentTime: "14:30",
      scheduledDate: "2024-02-09",
      channel: "sms",
      status: "delivered",
      message: "Hi Michael Brown, reminder: appointment on 2024-02-10 at 14:30. Reply to confirm."
    },
    {
      id: "3",
      patientName: "Emma Davis",
      appointmentDate: "2024-02-20",
      appointmentTime: "09:15",
      scheduledDate: "2024-02-17",
      channel: "whatsapp",
      status: "pending",
      message: "Hello Emma Davis! 👋 This is a friendly reminder about your appointment on 2024-02-20 at 09:15."
    },
    {
      id: "4",
      patientName: "James Wilson",
      appointmentDate: "2024-02-08",
      appointmentTime: "16:00",
      scheduledDate: "2024-02-07",
      channel: "email",
      status: "failed",
      message: "Dear James Wilson, this is a reminder for your upcoming appointment on 2024-02-08 at 16:00."
    }
  ]);

  const filteredReminders = reminders.filter(reminder => {
    if (filter === "all") return true;
    return reminder.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-3 w-3" />;
      case "sms":
        return <Phone className="h-3 w-3" />;
      case "whatsapp":
        return <MessageSquare className="h-3 w-3" />;
      default:
        return <Bell className="h-3 w-3" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "sent":
        return <Send className="h-4 w-4 text-blue-600" />;
      case "delivered":
        return <Check className="h-4 w-4 text-green-600" />;
      case "failed":
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleResendReminder = (reminderId: string) => {
    console.log("Resending reminder:", reminderId);
    toast({
      title: "Reminder Resent",
      description: "The reminder has been queued for resending.",
    });
  };

  const stats = {
    total: reminders.length,
    pending: reminders.filter(r => r.status === "pending").length,
    sent: reminders.filter(r => r.status === "sent").length,
    delivered: reminders.filter(r => r.status === "delivered").length,
    failed: reminders.filter(r => r.status === "failed").length
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reminder Dashboard</h2>
        <p className="text-gray-600">Monitor and manage all appointment reminders</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <p className="text-sm text-gray-600">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.sent}</div>
            <p className="text-sm text-gray-600">Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
            <p className="text-sm text-gray-600">Delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <p className="text-sm text-gray-600">Failed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4 text-gray-600" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reminders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline">{filteredReminders.length} reminders</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.map((reminder) => (
          <Card key={reminder.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    {getChannelIcon(reminder.channel)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">{reminder.patientName}</h4>
                      <Badge className={getStatusColor(reminder.status)} variant="secondary">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(reminder.status)}
                          {reminder.status}
                        </div>
                      </Badge>
                      <Badge variant="outline">
                        {reminder.channel.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <strong>Appointment:</strong> {new Date(reminder.appointmentDate).toLocaleDateString()} at {reminder.appointmentTime}
                      </div>
                      <div>
                        <strong>Scheduled:</strong> {new Date(reminder.scheduledDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 max-w-2xl">
                      <strong>Message:</strong> {reminder.message}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {reminder.status === "failed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleResendReminder(reminder.id)}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Resend
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReminders.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reminders found</h3>
            <p className="text-gray-600">
              {filter === "all" 
                ? "No reminders have been scheduled yet." 
                : `No ${filter} reminders found.`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
