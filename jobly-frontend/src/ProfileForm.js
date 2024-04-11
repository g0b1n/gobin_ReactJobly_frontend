import React, { useEffect, useState } from 'react';
import { useUser, setUser } from './Context/UserContext';
import JoblyApi from './api';
import './ProfileForm.css';

function ProfileForm() {

    const { user, setUser } = useUser()

    const initiaState = {
        username: "",
        firstName: "",
        lastName: "",
        email: ""
    }

    const [formData, setFormData] = useState(initiaState);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // fetch user data from api
        async function getUserData() {
            if (user && user.username){
                try {
                    const userData = await JoblyApi.getCurrentUser(user.username);
                    setFormData({
                        username: userData.username,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email
                    });
                } catch (error) {
                    console.error("Failed to fetch user data:", error.message);
                }
            }
        }
        getUserData();
    }, [user]);

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // exclude username from being submitted
        const { username, ...updateData } = formData
        console.log("Submitting", formData);
        setIsSaving(true);
    
        try {
            const updatedUser = await JoblyApi.updateProfile(user.username, formData);
            setUser(updatedUser)
            alert('Profile updated successfully');
        } catch (error) {
            console.error("Update error:", error);
            if (error.response && error.response.data) {
                // if the server send a specific message, use it
                alert(`Failed to update profile: ${error.response.data.error.message}`);
            } else {
                alert('Failed to update profile. Please try again.');
            }
        }
        setIsSaving(false);
    };

  return (
    <div className="profile-form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    id="username" type="text"
                    name="username"
                    placeholder="username" value={formData.username}
                    onChange={handleChange}
                    disabled
                />
                <label htmlFor="firstName">First Name</label>
                <input 
                    id="firstName" type="text"
                    name="firstName"
                    placeholder="First Name" value={formData.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName" type="text" 
                    name="lastName"
                    placeholder="Last Name" value={formData.lastName} 
                    onChange={handleChange} 
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email" type="email" 
                    name="email"
                    placeholder="email" value={formData.email} 
                    onChange={handleChange} 
                />
                <button type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
  )
}

export default ProfileForm;
