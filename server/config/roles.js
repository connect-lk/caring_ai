export const roles = {
    SuperAdmin: {
        can: [
            "patients:create",
            "patients:read",
            "patients:update",
            "patients:delete",
            "assessments:create",
            "assessments:read",
            "assessments:update",
            "assessments:delete",
            "audit:read"
        ]
    },
    Admin: {
        can: [
            "patients:read",
            "patients:update",
            "assessments:create",
            "assessments:read",
            "assessments:update"
        ]
    },
    // Doctor: {
    //     can: ["assessments:create", "assessments:read", "assessments:update"]
    // },
    // Nurse: {
    //     can: ["assessments:read", "assessments:update"]
    // },
    // Patient: {
    //     can: ["assessments:read"] // maybe only their own
    // }
};