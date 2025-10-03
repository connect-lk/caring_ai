// Authentication service for HIPAA compliant cookie-based auth
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class AuthService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Make authenticated requests with credentials
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            credentials: 'include', // Include cookies
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Register new user
    async signup(userData) {
        return this.makeRequest('/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    // Login user
    async login(credentials) {
        return this.makeRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    // Logout user
    async logout() {
        return this.makeRequest('/auth/logout', {
            method: 'POST',
        });
    }

    // Get current user
    async getCurrentUser() {
        return this.makeRequest('/auth/me', {
            method: 'GET',
        });
    }

    // Verify email
    async verifyEmail(token) {
        return this.makeRequest(`/auth/verify/${token}`, {
            method: 'GET',
        });
    }

    // Check if user is authenticated
    async checkAuth() {
        try {
            const response = await this.getCurrentUser();
            return response.success && response.user;
        } catch (error) {
            return false;
        }
    }
}

export default new AuthService();
