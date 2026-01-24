import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
    name: string;
    avatar?: string; // Icon name or URI
}

interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
    updateAvatar: (avatar: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User | null>(null);

    const setUser = (userData: User) => {
        setUserState(userData);
    };

    const updateAvatar = (avatar: string) => {
        setUserState(prev => prev ? { ...prev, avatar } : null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, updateAvatar }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
