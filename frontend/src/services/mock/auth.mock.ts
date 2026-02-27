// src/services/mock/auth.mock.ts

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    role: 'owner' | 'admin' | 'editor' | 'viewer';
    workspaces: Workspace[];
}

export interface Workspace {
    id: string;
    name: string;
    logoColor: string;
    plan: 'free' | 'pro' | 'enterprise';
    memberCount: number;
}

const MOCK_USER: User = {
    id: 'u-1',
    name: 'Sarah Mitchell',
    email: 'sarah@sharemotion.io',
    avatarUrl: '',
    role: 'owner',
    workspaces: [
        { id: 'ws-1', name: 'Mitchell Studios', logoColor: 'from-indigo-500 to-purple-600', plan: 'pro', memberCount: 5 },
        { id: 'ws-2', name: 'Luxe Fashion Co', logoColor: 'from-rose-500 to-pink-600', plan: 'enterprise', memberCount: 12 },
        { id: 'ws-3', name: 'TechVibe Agency', logoColor: 'from-cyan-500 to-blue-600', plan: 'free', memberCount: 3 },
    ],
};

const AUTH_KEY = 'share_motion_auth';

export const MockAuthService = {
    async login(email: string, _password: string): Promise<User> {
        await new Promise(r => setTimeout(r, 1200));
        if (email === 'demo@sharemotion.io' || email) {
            localStorage.setItem(AUTH_KEY, JSON.stringify(MOCK_USER));
            return MOCK_USER;
        }
        throw new Error('Invalid credentials');
    },

    async register(name: string, email: string, _password: string): Promise<User> {
        await new Promise(r => setTimeout(r, 1500));
        const user = { ...MOCK_USER, name, email };
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        return user;
    },

    async getCurrentUser(): Promise<User | null> {
        await new Promise(r => setTimeout(r, 300));
        const stored = localStorage.getItem(AUTH_KEY);
        return stored ? JSON.parse(stored) : null;
    },

    logout() {
        localStorage.removeItem(AUTH_KEY);
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem(AUTH_KEY);
    }
};
