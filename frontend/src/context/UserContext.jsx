import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const navigate = useNavigate();
   
    const [currentUser, setCurrentUser] = useState(null);
    const [auth_token, setAuthToken] = useState(()=> localStorage.getItem("access_token"));


    console.log("Current User usesatet variable: ", currentUser);


    // All functions to manage user data

    // ========= Function to register a user ==========
    function register_user(username, email, password)
    {
        toast.loading("Registering user...");

        fetch("http://127.0.0.1:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: username,email: email, password: password})
            }
        )
        .then(response => response.json())
        .then(res => {
            if(res.error){
                toast.dismiss();
                toast.error(res.error)

            }
            else if(res.success){
                  toast.dismiss();
                  toast.success(res.success)
                //   navigate to login page
                    navigate("/login");
            }
            else{
                toast.dismiss();
                toast.error("An error occurred while registering the user.")
            }
        })
        
    }

    // ======== Function to login a user ========
    function login_user(email, password){
        toast.loading("Logging you in...");

        fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: email, password: password})
            }
        )
        .then(response => response.json())
        .then(res => {
            if(res.error){
                toast.dismiss();
                toast.error(res.error)

            }
            else if(res.access_token){
                  toast.dismiss();
                  toast.success("Logged in successfully!");

                //   save token to localstorage
                localStorage.setItem("access_token", res.access_token);
                setAuthToken(res.access_token)
                  
                //   navigate to question page
                    navigate("/questions");
            }
            else{
                toast.dismiss();
                toast.error("An error occurred while logging in!")
            }
        })
        
    }

    // ======= Function to logout a user ========
    function logout_user(){
        fetch("http://127.0.1:5000/logout", {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${auth_token}`,
            }
        }
        )   
        .then(response => response.json())
        .then(res => {
            if(res.success){
                toast.success(res.success);
                localStorage.removeItem("access_token");
                setAuthToken(null);
                setCurrentUser(null);
                navigate("/login");
            }
            else{
                toast.error("An error occurred while logging out!")
            }
        })   

    }

    // ======== Function to update user profile ========
    function update_user_profile(username, email, password, newPassword)
    {
        toast.loading("Updating profile...");

        fetch("http://127.0.0.1:5000/update_user", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth_token}`
                },
                body: JSON.stringify({username: username, email: email, password: password, newPassword: newPassword})
            }
        )
        .then(res=>res.json())
        .then(res => {
            if(res.error){
                toast.dismiss();
                toast.error(res.error);
            }
            else if(res.success){
                toast.dismiss();
                toast.success(res.success);
           
            }
            else{
                toast.dismiss();
                toast.error("An error occurred while updating the profile.");
            }

        }
    )}

    // delete user profile
    function delete_profile(){
        toast.loading("Deleting profile...");

        fetch("http://127.0.0.1:5000/delete_user_profile", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth_token}`
                }
            }
        )
        .then(res=>res.json())
        .then(res => {
            if(res.error){
                toast.dismiss();
                toast.error(res.error);
            }
            else if(res.success){
                toast.dismiss();
                toast.success(res.success);

                localStorage.removeItem("access_token");
                setAuthToken(null);
                setCurrentUser(null);
                navigate("/login");
            }
            else{
                toast.dismiss();
                toast.error("An error occurred while deleting the profile.");
            }

        })

    }

    // ======= get current user data =======
    useEffect(() => {
        if(auth_token){
             fetch("http://127.0.0.1:5000/current_user",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth_token}`
            } })
            .then(response => response.json())
            .then(res => {
                
                if(res.msg){
                    toast.error( res.msg);
                }
                else{
                    console.log("Current user responsexxx ", res);
                    setCurrentUser(res);
                }
            })
        }
    }, [auth_token]);





    const context_data={
        auth_token,
        delete_profile,
        currentUser,
        register_user,
        login_user,
        logout_user,
        update_user_profile
    }

    return(
        <UserContext.Provider value={context_data}>
            {children}
        </UserContext.Provider>
    )

};