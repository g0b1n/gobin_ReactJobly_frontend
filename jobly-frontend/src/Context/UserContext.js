import React, { createContext, useContext, useState, useEffect } from "react";
import JoblyApi from "../api";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // check if user is logged in based on the presence of the user object
    const isLoggedIn = Boolean(user);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                JoblyApi.token = storedToken; // Set the token for future API requests
                try {
                    const userData = await JoblyApi.getCurrentUser();
                    setUser(userData); // Set user data in context
                } catch (error) {
                    console.log("Could not fetch user data:", error);
                }
            }
        };
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};