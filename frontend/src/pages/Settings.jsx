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
import {ApplicationConfigurationManagement} from '../DynamicData.js'
import CognitiveAssessmentdetails from "../components/requestAssessment/CognitiveAssessmentdetails.jsx";


const Settings = () => {
  const [activeTab, setActiveTab] = useState("organization"); 

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
  { id: "assessmenttypes", name: "Assessment Types", icon: ClipboardList },
  { id: "genders", name: "Genders", icon: VenusAndMars }, // ✅ fixed
  { id: "ethnicities", name: "Ethnicities", icon: Globe2 },
  { id: "integrations", name: "Integrations", icon: Plug },
  { id: "auditlogs", name: "Audit Logs", icon: FileSearch },
];
  return (
    <div className="space-y-6">

     <CognitiveAssessmentdetails NewAssessment={ApplicationConfigurationManagement}/>

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
