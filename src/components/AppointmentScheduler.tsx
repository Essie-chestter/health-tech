
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Bell, User, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  notes: string;
  reminderScheduled: boolean;
  reminderDays: number;
  status: "scheduled" | "confirmed" | "completed" | "cancelled";
}

export const AppointmentScheduler = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    appointmentDate: "",
    appointmentTime: "",
    appointmentType: "consultation",
    notes: "",
    reminderDays: 3
  });

  // Mock appointments data
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      patientName: "Sarah Johnson",
      patientPhone: "+1-555-0123",
      patientEmail: "sarah.j@email.com",
      appointmentDate: "2024-02-15",
      appointmentTime: "10:00",
      appointmentType: "Follow-up",
      notes: "Check blood pressure and review medication",
      reminderScheduled: true,
      reminderDays: 3,
      status: "scheduled"
    },
    {
      id: "2",
      patientName: "Michael Brown",
      patientPhone: "+1-555-0124",
      patientEmail: "michael.b@email.com",
      appointmentDate: "2024-02-10",
      appointmentTime: "14:30",
      appointmentType: "Consultation",
      notes: "Initial consultation for diabetes management",
      reminderScheduled: true,
      reminderDays: 1,
      status: "confirmed"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.appointmentDate || !formData.appointmentTime) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save to your backend
    console.log("Scheduling appointment:", formData);
    
    toast({
      title: "Appointment Scheduled",
      description: `Appointment for ${formData.patientName} has been scheduled successfully.`,
    });

    // Reset form
    setFormData({
      patientName: "",
      patientPhone: "",
      patientEmail: "",
      appointmentDate: "",
      appointmentTime: "",
      appointmentType: "consultation",
      notes: "",
      reminderDays: 3
    });
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Schedule New Appointment</h2>
            <p className="text-gray-600">Create a new appointment and set up automatic reminders</p>
          </div>
          <Button variant="outline" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                    placeholder="Enter patient's name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patientPhone">Phone Number</Label>
                  <Input
                    id="patientPhone"
                    type="tel"
                    value={formData.patientPhone}
                    onChange={(e) => setFormData({...formData, patientPhone: e.target.value})}
                    placeholder="+1-555-0123"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patientEmail">Email Address</Label>
                  <Input
                    id="patientEmail"
                    type="email"
                    value={formData.patientEmail}
                    onChange={(e) => setFormData({...formData, patientEmail: e.target.value})}
                    placeholder="patient@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointmentType">Appointment Type</Label>
                  <Select value={formData.appointmentType} onValueChange={(value) => setFormData({...formData, appointmentType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="lab-results">Lab Results Review</SelectItem>
                      <SelectItem value="routine-checkup">Routine Checkup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointmentDate">Appointment Date *</Label>
                  <Input
                    id="appointmentDate"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointmentTime">Appointment Time *</Label>
                  <Input
                    id="appointmentTime"
                    type="time"
                    value={formData.appointmentTime}
                    onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Additional notes or instructions for the appointment"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminderDays">Reminder Settings</Label>
                <Select value={formData.reminderDays.toString()} onValueChange={(value) => setFormData({...formData, reminderDays: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue placeholder="When to send reminder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day before</SelectItem>
                    <SelectItem value="3">3 days before</SelectItem>
                    <SelectItem value="7">1 week before</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointment Management</h2>
          <p className="text-gray-600">Schedule appointments and manage follow-up reminders</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Upcoming Appointments */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-lg">{appointment.patientName}</h4>
                      <Badge className={getStatusColor(appointment.status)} variant="secondary">
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {new Date(appointment.appointmentDate).toLocaleDateString()} at {appointment.appointmentTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {appointment.appointmentType}
                      </div>
                      {appointment.patientPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          {appointment.patientPhone}
                        </div>
                      )}
                      {appointment.patientEmail && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          {appointment.patientEmail}
                        </div>
                      )}
                    </div>
                    {appointment.notes && (
                      <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {appointment.reminderScheduled && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <Bell className="h-3 w-3 mr-1" />
                      Reminder Set
                    </Badge>
                  )}
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {appointments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments scheduled</h3>
            <p className="text-gray-600 mb-4">
              Get started by scheduling your first appointment.
            </p>
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Schedule First Appointment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
