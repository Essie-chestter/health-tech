
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Phone, Mail, Calendar, User } from "lucide-react";
import { PatientForm } from "./PatientForm";

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

export const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Mock patient data
  const [patients] = useState<Patient[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      phone: "+1-555-0123",
      email: "sarah.j@email.com",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-02-15",
      status: "active",
      preferredContact: "email"
    },
    {
      id: "2",
      name: "Michael Brown",
      phone: "+1-555-0124",
      email: "michael.b@email.com",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-02-10",
      status: "active",
      preferredContact: "sms"
    },
    {
      id: "3",
      name: "Emma Davis",
      phone: "+1-555-0125",
      email: "emma.d@email.com",
      lastVisit: "2023-12-20",
      status: "overdue",
      preferredContact: "whatsapp"
    },
    {
      id: "4",
      name: "James Wilson",
      phone: "+1-555-0126",
      email: "james.w@email.com",
      lastVisit: "2024-01-20",
      nextAppointment: "2024-03-01",
      status: "active",
      preferredContact: "email"
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case "sms":
        return <Phone className="h-3 w-3" />;
      case "email":
        return <Mail className="h-3 w-3" />;
      case "whatsapp":
        return <Phone className="h-3 w-3" />;
      default:
        return <Mail className="h-3 w-3" />;
    }
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <PatientForm
        patient={selectedPatient}
        onClose={() => setShowForm(false)}
        onSave={() => {
          setShowForm(false);
          setSelectedPatient(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
          <p className="text-gray-600">Manage patient information and contact preferences</p>
        </div>
        <Button onClick={handleAddPatient} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search patients by name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{filteredPatients.length} patients</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <Badge className={getStatusColor(patient.status)} variant="secondary">
                      {patient.status}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditPatient(patient)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-3 w-3" />
                  {patient.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-3 w-3" />
                  {patient.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-3 w-3" />
                  Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                </div>
                {patient.nextAppointment && (
                  <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                    <Calendar className="h-3 w-3" />
                    Next: {new Date(patient.nextAppointment).toLocaleDateString()}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  {getContactIcon(patient.preferredContact)}
                  Preferred: {patient.preferredContact.toUpperCase()}
                </div>
                <Button variant="outline" size="sm">
                  Send Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Try adjusting your search terms." : "Get started by adding your first patient."}
            </p>
            {!searchTerm && (
              <Button onClick={handleAddPatient} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add First Patient
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
