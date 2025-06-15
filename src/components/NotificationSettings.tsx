
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Phone, Settings, Save, TestTube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NotificationSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    email: {
      enabled: true,
      smtpServer: "smtp.gmail.com",
      smtpPort: "587",
      username: "",
      password: "",
      fromName: "FollowUp Pro",
      fromEmail: ""
    },
    sms: {
      enabled: false,
      provider: "twilio",
      accountSid: "",
      authToken: "",
      fromNumber: ""
    },
    whatsapp: {
      enabled: false,
      apiKey: "",
      fromNumber: ""
    },
    templates: {
      reminderEmail: "Dear {patient_name}, this is a reminder for your upcoming appointment on {appointment_date} at {appointment_time}. Please confirm your attendance.",
      reminderSms: "Hi {patient_name}, reminder: appointment on {appointment_date} at {appointment_time}. Reply to confirm.",
      reminderWhatsapp: "Hello {patient_name}! 👋 This is a friendly reminder about your appointment on {appointment_date} at {appointment_time}. Please let us know if you can make it."
    }
  });

  const handleSave = () => {
    console.log("Saving notification settings:", settings);
    toast({
      title: "Settings Saved",
      description: "Notification settings have been updated successfully.",
    });
  };

  const handleTestNotification = (type: string) => {
    console.log(`Testing ${type} notification...`);
    toast({
      title: "Test Sent",
      description: `Test ${type} notification has been sent.`,
    });
  };

  const updateSetting = (category: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Notification Settings</h2>
        <p className="text-gray-600">Configure SMS, WhatsApp, and email notification channels</p>
      </div>

      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Notifications
            </CardTitle>
            <div className="flex items-center gap-2">
              <Switch
                checked={settings.email.enabled}
                onCheckedChange={(checked) => updateSetting('email', 'enabled', checked)}
              />
              <Badge variant={settings.email.enabled ? "default" : "secondary"}>
                {settings.email.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-server">SMTP Server</Label>
              <Input
                id="smtp-server"
                value={settings.email.smtpServer}
                onChange={(e) => updateSetting('email', 'smtpServer', e.target.value)}
                placeholder="smtp.gmail.com"
                disabled={!settings.email.enabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input
                id="smtp-port"
                value={settings.email.smtpPort}
                onChange={(e) => updateSetting('email', 'smtpPort', e.target.value)}
                placeholder="587"
                disabled={!settings.email.enabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-username">Username</Label>
              <Input
                id="email-username"
                type="email"
                value={settings.email.username}
                onChange={(e) => updateSetting('email', 'username', e.target.value)}
                placeholder="your-email@gmail.com"
                disabled={!settings.email.enabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-password">Password/App Password</Label>
              <Input
                id="email-password"
                type="password"
                value={settings.email.password}
                onChange={(e) => updateSetting('email', 'password', e.target.value)}
                placeholder="Your app password"
                disabled={!settings.email.enabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-name">From Name</Label>
              <Input
                id="from-name"
                value={settings.email.fromName}
                onChange={(e) => updateSetting('email', 'fromName', e.target.value)}
                placeholder="Your Clinic Name"
                disabled={!settings.email.enabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-email">From Email</Label>
              <Input
                id="from-email"
                type="email"
                value={settings.email.fromEmail}
                onChange={(e) => updateSetting('email', 'fromEmail', e.target.value)}
                placeholder="noreply@yourclinic.com"
                disabled={!settings.email.enabled}
              />
            </div>
          </div>
          {settings.email.enabled && (
            <Button variant="outline" onClick={() => handleTestNotification('email')}>
              <TestTube className="h-4 w-4 mr-2" />
              Test Email
            </Button>
          )}
        </CardContent>
      </Card>

      {/* SMS Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              SMS Notifications
            </CardTitle>
            <div className="flex items-center gap-2">
              <Switch
                checked={settings.sms.enabled}
                onCheckedChange={(checked) => updateSetting('sms', 'enabled', checked)}
              />
              <Badge variant={settings.sms.enabled ? "default" : "secondary"}>
                {settings.sms.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="twilio-sid">Twilio Account SID</Label>
              <Input
                id="twilio-sid"
                value={settings.sms.accountSid}
                onChange={(e) => updateSetting('sms', 'accountSid', e.target.value)}
                placeholder="ACxxxxxxxxxxxxxxxxx"
                disabled={!settings.sms.enabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twilio-token">Twilio Auth Token</Label>
              <Input
                id="twilio-token"
                type="password"
                value={settings.sms.authToken}
                onChange={(e) => updateSetting('sms', 'authToken', e.target.value)}
                placeholder="Your auth token"
                disabled={!settings.sms.enabled}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="sms-from">From Number</Label>
              <Input
                id="sms-from"
                value={settings.sms.fromNumber}
                onChange={(e) => updateSetting('sms', 'fromNumber', e.target.value)}
                placeholder="+1234567890"
                disabled={!settings.sms.enabled}
              />
            </div>
          </div>
          {settings.sms.enabled && (
            <Button variant="outline" onClick={() => handleTestNotification('SMS')}>
              <TestTube className="h-4 w-4 mr-2" />
              Test SMS
            </Button>
          )}
        </CardContent>
      </Card>

      {/* WhatsApp Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              WhatsApp Notifications
            </CardTitle>
            <div className="flex items-center gap-2">
              <Switch
                checked={settings.whatsapp.enabled}
                onCheckedChange={(checked) => updateSetting('whatsapp', 'enabled', checked)}
              />
              <Badge variant={settings.whatsapp.enabled ? "default" : "secondary"}>
                {settings.whatsapp.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-api">WhatsApp API Key</Label>
              <Input
                id="whatsapp-api"
                type="password"
                value={settings.whatsapp.apiKey}
                onChange={(e) => updateSetting('whatsapp', 'apiKey', e.target.value)}
                placeholder="Your WhatsApp API key"
                disabled={!settings.whatsapp.enabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp-from">From Number</Label>
              <Input
                id="whatsapp-from"
                value={settings.whatsapp.fromNumber}
                onChange={(e) => updateSetting('whatsapp', 'fromNumber', e.target.value)}
                placeholder="+1234567890"
                disabled={!settings.whatsapp.enabled}
              />
            </div>
          </div>
          {settings.whatsapp.enabled && (
            <Button variant="outline" onClick={() => handleTestNotification('WhatsApp')}>
              <TestTube className="h-4 w-4 mr-2" />
              Test WhatsApp
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Message Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Message Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-template">Email Template</Label>
              <Textarea
                id="email-template"
                value={settings.templates.reminderEmail}
                onChange={(e) => updateSetting('templates', 'reminderEmail', e.target.value)}
                rows={3}
                placeholder="Email reminder template"
              />
              <p className="text-xs text-gray-500">
                Available variables: {"{patient_name}"}, {"{appointment_date}"}, {"{appointment_time}"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sms-template">SMS Template</Label>
              <Textarea
                id="sms-template"
                value={settings.templates.reminderSms}
                onChange={(e) => updateSetting('templates', 'reminderSms', e.target.value)}
                rows={2}
                placeholder="SMS reminder template"
              />
              <p className="text-xs text-gray-500">
                Keep it short for SMS. Available variables: {"{patient_name}"}, {"{appointment_date}"}, {"{appointment_time}"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp-template">WhatsApp Template</Label>
              <Textarea
                id="whatsapp-template"
                value={settings.templates.reminderWhatsapp}
                onChange={(e) => updateSetting('templates', 'reminderWhatsapp', e.target.value)}
                rows={3}
                placeholder="WhatsApp reminder template"
              />
              <p className="text-xs text-gray-500">
                You can use emojis for WhatsApp. Available variables: {"{patient_name}"}, {"{appointment_date}"}, {"{appointment_time}"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};
