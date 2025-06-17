import React, { useState } from 'react';

const Profile = () => {
  const [username, setUsername] = useState('john_doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Profile Updated:', { username, email, newPassword });
  };

  const handleBlockUser = () => {
    alert('User has been blocked!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-8">
      <div className="border bg-white rounded-lg shadow-md p-8 w-full sm:w-[50vw]">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
            alt="Profile"
            className="rounded-full w-32 h-32 mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{username}</h2>
          <p className="text-sm text-gray-600">{email}</p>
        </div>

        {/* Buttons for Admin/User and Block User */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            className="bg-blue-500 px-8 py-3 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Admin
          </button>
          <button
            className=" bg-green-500 px-8 py-3 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            User
          </button>
        </div>

        {/* profile update form */}
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Current Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">New Password</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-700 transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
