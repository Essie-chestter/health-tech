
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextAppointment?: string;
  status: "active" | "inactive" | "overdue";
  preferredContact: "sms" | "whatsapp" | "email";
}

interface PatientFormProps {
  patient?: Patient | null;
  onClose: () => void;
  onSave: (patient: Patient) => void;
}

export const PatientForm = ({ patient, onClose, onSave }: PatientFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: patient?.name || "",
    phone: patient?.phone || "",
    email: patient?.email || "",
    preferredContact: patient?.preferredContact || "email",
    status: patient?.status || "active"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const savedPatient: Patient = {
      id: patient?.id || Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      lastVisit: patient?.lastVisit || new Date().toISOString().split('T')[0],
      nextAppointment: patient?.nextAppointment,
      status: formData.status as "active" | "inactive" | "overdue",
      preferredContact: formData.preferredContact as "sms" | "whatsapp" | "email"
    };

    onSave(savedPatient);
    
    toast({
      title: "Success",
      description: `Patient ${patient ? 'updated' : 'added'} successfully.`,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onClose}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Patients
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {patient ? 'Edit Patient' : 'Add New Patient'}
          </h2>
          <p className="text-gray-600">
            {patient ? 'Update patient information' : 'Enter patient details and contact preferences'}
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter patient's full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1-555-0123"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="patient@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                <Select value={formData.preferredContact} onValueChange={(value) => handleInputChange('preferredContact', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Patient Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                {patient ? 'Update Patient' : 'Add Patient'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
