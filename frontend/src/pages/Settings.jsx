import { useState } from "react";
import SecurityFeatures from "../components/SecurityFeatures";
import { 
  Settings as SettingsIcon,
  UserCog,
  Users,
  ClipboardList,
  VenusAndMars,  // ✅ instead of GenderIntersex
  Globe2,
  Plug,
  FileSearch,
} from "lucide-react"; 
import OrganizationDetails from "../components/Settings/Organization";


const Settings = () => {
  const [activeTab, setActiveTab] = useState("organization");
  const [isExpanded, setIsExpanded] = useState(false);

  const [formData, setFormData] = useState({
    displayName: "System Admin",
    email: "admin@caring.ai",
    role: "Administrator",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    preferences: {
      theme: "system",
      language: "en",
      timezone: "UTC",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

 

const tabs = [
  { id: "organization", name: "Organization", icon: SettingsIcon },
  { id: "doctors", name: "Doctors", icon: UserCog },
  { id: "patients", name: "Patients", icon: Users },
  { id: "assessmenttypes", name: "Assessment Types", icon: ClipboardList },
  { id: "genders", name: "Genders", icon: VenusAndMars }, // ✅ fixed
  { id: "ethnicities", name: "Ethnicities", icon: Globe2 },
  { id: "integrations", name: "Integrations", icon: Plug },
  { id: "auditlogs", name: "Audit Logs", icon: FileSearch },
];
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl mt-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]   outline-1 outline-offset-[-1px] outline-white/40 backdrop-blur-[6px] mb-8">
        <div   onClick={() => setIsExpanded(!isExpanded)}  className="p-6 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100   rounded-lg flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-blue-600  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900  ">
                  Application Configuration & Management
                </h2>
                <p className="text-sm text-gray-600  ">
                  Configure system settings, manage users, and customize
                  application behavior
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg hover:bg-gray-100   text-gray-600  transition-colors"
              aria-label={isExpanded ? "Collapse section" : "Expand section"}
            >
              <svg
                className={`h-5 w-5 transition-transform duration-200 cursor-pointer ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="px-6 pb-6">
            <div className="bg-gray-50   rounded-lg p-4">
              <p className="text-sm text-gray-700   mb-4">
                This settings page provides comprehensive system administration
                and configuration options:
              </p>

              {/* Ordered List */}
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700  ">
                <li>
                  <span className="font-semibold">Organization Settings:</span>{" "}
                  Configure clinic information, contact details, and branding
                </li>
                <li>
                  <span className="font-semibold">
                    Assessment Configuration:
                  </span>{" "}
                  Manage test types, genders, ethnicities, and other dropdown
                  options
                </li>
                <li>
                  <span className="font-semibold">Doctor Management:</span> Add,
                  edit, and manage doctor profiles and specializations
                </li>
                <li>
                  <span className="font-semibold">Patient Database:</span>{" "}
                  Access patient management tools and duplicate detection
                </li>
                <li>
                  <span className="font-semibold">AI Integration:</span>{" "}
                  Configure Awaz.AI settings and API connections
                </li>
                <li>
                  <span className="font-semibold">User Management:</span>{" "}
                  Control user access, roles, and permissions (admin only)
                </li>
                <li>
                  <span className="font-semibold">System Monitoring:</span> View
                  audit logs and track system changes
                </li>
                <li>
                  <span className="font-semibold">Data Management:</span>{" "}
                  MongoDB integration and field mapping configuration
                </li>
              </ol>

              <p className="text-sm text-gray-700   mt-4">
                Admin privileges are required to access most configuration
                options. Contact your system administrator if you need
                additional access.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-56  ">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors duration-200
                  ${
                    activeTab === tab?.id
                      ? "  text-primary-700   bg-gray-200  "
                      : "text-gray-700   hover:bg-gray-100  "
                  }
                `}
              >
                <tab.icon className="mr-3 h-5 w-5 text-gray-600" />
                {tab?.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white  0 rounded-lg border border-gray-200 p-8">
            {/* Account Settings */}
            {activeTab === "organization" && (
            <OrganizationDetails/>
            )}

            {/* Notification Settings */}
            {activeTab === "doctors" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900  ">
                  Notification Preferences
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900  ">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-gray-500  ">
                        Receive notifications via email
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange("email")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        formData.notifications.email
                          ? "bg-primary-600"
                          : "bg-gray-200  "
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          formData.notifications.email
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900  ">
                        Push Notifications
                      </h3>
                      <p className="text-sm text-gray-500  ">
                        Receive push notifications in browser
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange("push")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        formData.notifications.push
                          ? "bg-primary-600"
                          : "bg-gray-200  "
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          formData.notifications.push
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900  ">
                        SMS Notifications
                      </h3>
                      <p className="text-sm text-gray-500  ">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange("sms")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        formData.notifications.sms
                          ? "bg-primary-600"
                          : "bg-gray-200  "
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          formData.notifications.sms
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === "patients" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900  ">
                  Preferences
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700   mb-2">
                      Theme
                    </label>
                    <select
                      name="theme"
                      value={formData.preferences.theme}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300   rounded-lg bg-white   text-gray-900   focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-2">
                      Language
                    </label>
                    <select
                      name="language"
                      value={formData.preferences.language}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300   rounded-lg bg-white   text-gray-900   focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700   mb-2">
                      Timezone
                    </label>
                    <select
                      name="timezone"
                      value={formData.preferences.timezone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300   rounded-lg bg-white   text-gray-900   focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="PST">Pacific Time</option>
                      <option value="GMT">Greenwich Mean Time</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === "assessmenttypes" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900  ">
                  Security Settings
                </h2>
                <SecurityFeatures />
              </div>
            )}

            {/* Save Button */}
            {/* <div className="pt-6 border-t border-gray-200  flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Save Changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
