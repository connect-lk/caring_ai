export const roles = {
    SuperAdmin: {
        can: [
            "patients:create",
            "patients:read",
            "patients:update",
            "patients:delete",
            "doctors:create",
            "doctors:read",
            "doctors:update",
            "doctors:delete",
            "assessments:create",
            "assessments:read",
            "assessments:update",
            "assessments:delete",
            "audit:read"
        ]
    },
    Admin: {
        can: [
            "patients:create",
            "patients:read",
            "patients:update",
            "patients:delete",
            "doctors:create",
            "doctors:read",
            "doctors:update",
            "doctors:delete",
            "assessments:create",
            "assessments:read",
            "assessments:update",
            "assessments:delete",
            "audit:read"
        ]
    },
};