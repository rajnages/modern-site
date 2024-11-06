class API {
    static BASE_URL = '/api';
    static TOKEN_KEY = 'auth_token';

    static getHeaders() {
        const token = localStorage.getItem(this.TOKEN_KEY);
        return {
            'Content-Type': 'application/json',
            'x-auth-token': token || ''
        };
    }

    static async register(userData) {
        try {
            const response = await fetch(`${this.BASE_URL}/register`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Registration failed');
            
            if (data.token) {
                localStorage.setItem(this.TOKEN_KEY, data.token);
            }
            
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    static async login(credentials) {
        try {
            const response = await fetch(`${this.BASE_URL}/login`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed');
            
            if (data.token) {
                localStorage.setItem(this.TOKEN_KEY, data.token);
            }
            
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    static async getProfile() {
        try {
            const response = await fetch(`${this.BASE_URL}/profile`, {
                headers: this.getHeaders()
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
            
            return data;
        } catch (error) {
            console.error('Profile fetch error:', error);
            throw error;
        }
    }

    static async updateProfile(profileData) {
        try {
            const response = await fetch(`${this.BASE_URL}/profile`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(profileData)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to update profile');
            
            return data;
        } catch (error) {
            console.error('Profile update error:', error);
            throw error;
        }
    }

    static async changePassword(passwordData) {
        try {
            const response = await fetch(`${this.BASE_URL}/change-password`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(passwordData)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to change password');
            
            return data;
        } catch (error) {
            console.error('Password change error:', error);
            throw error;
        }
    }

    static logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        // Additional cleanup if needed
    }

    static isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }
}