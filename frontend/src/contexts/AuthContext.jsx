import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check authentication status on app load
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            const userData = await authService.checkAuth();
            if (userData) {
                setUser(userData);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = useCallback(async (credentials) => {
        try {
            setError(null);
            setLoading(true);
            const response = await authService.login(credentials);
            
            if (response.success) {
                setUser(response.user);
                return { success: true, message: response.message };
            }
        } catch (error) {
            const errorMessage = error.message || 'Login failed';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    const signup = useCallback(async (userData) => {
        try {
            setError(null);
            setLoading(true);
            const response = await authService.signup(userData);
            
            if (response.success) {
                return { success: true, message: response.message };
            }
        } catch (error) {
            const errorMessage = error.message || 'Signup failed';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setError(null);
        }
    }, []);

    const verifyEmail = useCallback(async (token) => {
        try {
            setError(null);
            const response = await authService.verifyEmail(token);
            return { success: true, message: response.message };
        } catch (error) {
            const errorMessage = error.message || 'Email verification failed';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }
    }, []);

    const clearError = () => {
        setError(null);
    };

    const value = {
        user,
        loading,
        error,
        login,
        signup,
        logout,
        verifyEmail,
        checkAuthStatus,
        clearError,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
