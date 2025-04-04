import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Initialize state with token from storage
    const [loggedUser, setLoggedUser] = useState(() => {
        // Try to get token from localStorage first, then sessionStorage
        return localStorage.getItem('token') || sessionStorage.getItem('token') || null;
    });

    // Update storage when token changes
    useEffect(() => {
        if (loggedUser) {
            // If "remember me" was checked, use localStorage, otherwise sessionStorage
            const storage = localStorage.getItem('rememberMe') === 'true' ? localStorage : sessionStorage;
            storage.setItem('token', loggedUser);
        } else {
            // Clear tokens from both storages when logging out
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
        }
    }, [loggedUser]);

    return (
        <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
            {children}
        </UserContext.Provider>
    );
};