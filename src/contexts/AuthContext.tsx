import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Mock User type for local development
type User = {
  id: string;
  email: string;
  user_metadata: {
    name: string;
  };
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: { name?: string; password?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users storage (in a real app, this would be a database)
const MOCK_USERS_KEY = 'studyassistant_mock_users';
const MOCK_CURRENT_USER_KEY = 'studyassistant_current_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem(MOCK_CURRENT_USER_KEY);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem(MOCK_CURRENT_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const getStoredUsers = (): Record<string, { email: string; password: string; name: string }> => {
    const users = localStorage.getItem(MOCK_USERS_KEY);
    return users ? JSON.parse(users) : {};
  };

  const saveUser = (userData: { email: string; password: string; name: string }) => {
    const users = getStoredUsers();
    users[userData.email] = userData;
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = getStoredUsers();
    const userData = users[email];

    if (!userData || userData.password !== password) {
      throw new Error('Invalid email or password');
    }

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      user_metadata: {
        name: userData.name,
      },
    };

    setUser(user);
    localStorage.setItem(MOCK_CURRENT_USER_KEY, JSON.stringify(user));
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = getStoredUsers();

    if (users[email]) {
      throw new Error('User already exists with this email');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    saveUser({ email, password, name });

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      user_metadata: {
        name,
      },
    };

    setUser(user);
    localStorage.setItem(MOCK_CURRENT_USER_KEY, JSON.stringify(user));
    toast.success('Account created successfully!');
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem(MOCK_CURRENT_USER_KEY);
    toast.success('Logged out successfully');
  };

  const resetPassword = async (email: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = getStoredUsers();
    if (!users[email]) {
      throw new Error('No account found with this email');
    }

    toast.success('Password reset email sent (mock - check console)');
    console.log(`Mock password reset for ${email}. New password: 'password123'`);
  };

  const updateProfile = async (data: { name?: string; password?: string }) => {
    if (!user) throw new Error('No user logged in');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedUser = { ...user };
    if (data.name) {
      updatedUser.user_metadata.name = data.name;
    }

    setUser(updatedUser);
    localStorage.setItem(MOCK_CURRENT_USER_KEY, JSON.stringify(updatedUser));
    toast.success('Profile updated successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isLoading,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}