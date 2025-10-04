export const RequestNewAssessment = [
  {
    id: 1,
    title: "Schedule New Cognitive Assessment",
    description:
      "Complete this multi-step form to schedule an automated cognitive assessment call for a patient",
    details:
      "This comprehensive form allows you to schedule AI-powered cognitive assessments with complete patient information:",
    steps: [
      {
        label: "Patient Information:",
        text: "Enter or select existing patient details with automatic ID generation",
      },
      {
        label: "Assessment Configuration:",
        text: "Choose test type, doctor, and specific assessment parameters",
      },
      {
        label: "Scheduling:",
        text: "Select date, time, and timezone with availability validation",
      },
      {
        label: "Contact Details:",
        text: "Configure phone number and language preferences for the AI call",
      },
      {
        label: "Progress Tracking:",
        text: "Form sections are validated step-by-step to ensure completeness",
      },
    ],
    footer:
      "The assessment will be automatically queued and the patient will receive a call at the scheduled time.",
  } 
]
export const ApplicationConfigurationManagement = [
 
  {
    id: 1,
    title: "Application Configuration & Management",
    description:
      "Configure system settings, manage users, and customize application behavior",
    details:
      "This settings page provides comprehensive system administration and configuration options:",
    steps: [
      {
        label: "Organization Settings:",
        text: "Configure clinic information, contact details, and branding",
      },
      {
        label: "Assessment Configuration:",
        text: "Manage test types, genders, ethnicities, and other dropdown options",
      },
      {
        label: "Doctor Management:",
        text: "Add, edit, and manage doctor profiles and specializations",
      },
      {
        label: "Patient Database:",
        text: "Access patient management tools and duplicate detection",
      },
      {
        label: "AI Integration:",
        text: "Configure Awaz.AI settings and API connections",
      },
      {
        label: "User Management:",
        text: "Control user access, roles, and permissions (admin only)",
      },
      {
        label: "System Monitoring:",
        text: "View audit logs and track system changes",
      },
      {
        label: "Data Management:",
        text: "MongoDB integration and field mapping configuration",
      },
    ],
    footer:
      "Admin privileges are required to access most configuration options. Contact your system administrator if you need additional access.",
  },
]