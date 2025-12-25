import { useState } from "react";
import { toast } from "sonner";
import { User, Lock, Bell, Database } from "lucide-react";

export default function Settings() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Acme Corporation",
    phone: "+1 (555) 123-4567",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    quoteUpdates: true,
    weeklyReport: false,
    marketingEmails: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    toast.success("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Notification preferences saved!");
  };

  const handleExportData = () => {
    toast.success("Data export started — check your email soon!");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <h1 className="h3 mb-2">Settings</h1>
        <p className="text-muted">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="row g-4">
        {/* Profile Information */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-primary-subtle text-primary p-3 rounded-3">
                  <User size={24} />
                </div>
                <h5 className="mb-0">Profile Information</h5>
              </div>

              <form onSubmit={handleProfileSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={profileData.company}
                      onChange={handleProfileChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="mt-4 text-end">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-danger-subtle text-danger p-3 rounded-3">
                  <Lock size={24} />
                </div>
                <h5 className="mb-0">Change Password</h5>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4 text-end">
                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-purple-subtle text-purple p-3 rounded-3">
                  <Bell size={24} />
                </div>
                <h5 className="mb-0">Notifications</h5>
              </div>

              <form onSubmit={handleNotificationSubmit}>
                <div className="space-y-4">
                  {[
                    {
                      name: "emailNotifications",
                      label: "Email Notifications",
                      desc: "Receive all notifications via email",
                    },
                    {
                      name: "quoteUpdates",
                      label: "Quote Updates",
                      desc: "Get notified when quotes are created or updated",
                    },
                    {
                      name: "weeklyReport",
                      label: "Weekly Report",
                      desc: "Receive weekly summary of quote activity",
                    },
                    {
                      name: "marketingEmails",
                      label: "Marketing Emails",
                      desc: "Stay updated on new features and tips",
                    },
                  ].map((item) => (
                    <div key={item.name} className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name={item.name}
                        id={item.name}
                        checked={
                          notifications[item.name as keyof typeof notifications]
                        }
                        onChange={handleNotificationChange}
                      />
                      <label className="form-check-label" htmlFor={item.name}>
                        <div className="ms-2">
                          <div className="fw-medium">{item.label}</div>
                          <small className="text-muted">{item.desc}</small>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-end">
                  <button type="submit" className="btn btn-primary">
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-success-subtle text-success p-3 rounded-3">
                  <Database size={24} />
                </div>
                <h5 className="mb-0">Data Management</h5>
              </div>

              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div>
                  <h6 className="mb-1">Export Your Data</h6>
                  <p className="text-muted mb-0">
                    Download all your quotes and account data as a CSV file
                  </p>
                </div>
                <button onClick={handleExportData} className="btn btn-success">
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
