export const generateToken = (user, message, status, resp) => {
    const token = user.generateJsonWebToken();
    // Determine the cookie name based on the user's role
    // const cookieName = user.role === "Admin" ? "adminToken" : "MemberToken";
    const cookieName = "MemberToken";

    return resp
        .status(status)
        .cookie(cookieName, token)
        .json({
            status: true,
            message,
            token
        });
};