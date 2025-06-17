import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    // State to hold user data
    const [currentUser, setCurrentUser] = useState("KELVIN");

    // All functions to manage user data

    // Function to register a user
    function register_user(){
        console.log("Registering user...");
        
    }

    // Function to login a user
    function login_user(){
        console.log("Logging in user...");
        
    }

    // Function to logout a user
    function logout_user(){
        console.log("Logging out user...");
        
    }





    const context_data={
        currentUser,
        register_user,
        login_user,
        logout_user
    }

    return(
        <UserContext.Provider value={context_data}>
            {children}
        </UserContext.Provider>
    )

};