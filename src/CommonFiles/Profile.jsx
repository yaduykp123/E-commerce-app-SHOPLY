import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../CONTEXT/StoreContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5000/api";

function Profile() {
  const { user, setUser } = useStore();
  
  // Local state for forms
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    gender: user?.gender || '',
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !localStorage.getItem("isLoggedIn")) {
      toast.error("Please login to access this page");
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="inline-block text-blue-500 text-3xl animate-spin">
          <i className="fas fa-circle-notch"></i>
        </span>
      </div>
    );
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${API_URL}/user/update-profile`, formData, {
        withCredentials: true
      });
      
      const updatedUser = res.data;
      setUser(updatedUser);
      localStorage.setItem("USER", JSON.stringify(updatedUser));
      
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    
    setIsUpdatingPassword(true);
    try {
      await axios.patch(`${API_URL}/user/update-password`, { password: passwordData.newPassword }, {
        withCredentials: true
      });
      
      setPasswordData({ newPassword: '', confirmPassword: '' });
      toast.success("Password updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image must be less than 2MB");
    }

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await axios.patch(`${API_URL}/user/update-avatar`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const updatedUser = res.data;
      setUser(updatedUser);
      localStorage.setItem("USER", JSON.stringify(updatedUser));
      toast.success("Profile picture updated!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    setIsUploading(true);
    try {
      const res = await axios.patch(`${API_URL}/user/update-profile`, { profileImage: "" }, {
        withCredentials: true
      });
      
      const updatedUser = res.data;
      setUser(updatedUser);
      localStorage.setItem("USER", JSON.stringify(updatedUser));
      toast.success("Profile picture removed!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
            My Profile
          </h1>
          <p className="text-gray-500 font-medium">Manage  personal information and security settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Avatar & Summary Card */}
          <div className="col-span-1">
            <div className="bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-900/5 rounded-3xl p-8 border border-white text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative inline-block mb-6">
                <div className="w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100 mx-auto relative group-hover:border-blue-100 transition-colors">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                      <i className="fas fa-user text-6xl"></i>
                    </div>
                  )}
                  
                  {/* Upload Overlay */}
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity duration-300 ${isUploading ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}
                  >
                    {isUploading ? (
                      <i className="fas fa-circle-notch animate-spin text-2xl"></i>
                    ) : (
                      <>
                        <i className="fas fa-camera text-2xl mb-1"></i>
                        <span className="text-xs font-bold">Update Photo</span>
                      </>
                    )}
                  </div>
                </div>
                
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name || "User"}</h2>
              <p className="text-gray-500 text-sm mb-6 font-medium">{user.email}</p>

              {user.profileImage && (
                <button 
                  onClick={handleRemovePhoto}
                  disabled={isUploading}
                  className="text-red-500 hover:text-red-700 text-sm font-bold flex items-center justify-center gap-2 w-full transition-colors"
                >
                  <i className="fas fa-trash-alt"></i> Remove Photo
                </button>
              )}
            </div>
          </div>

          {/* Settings Section */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            
            {/* Personal Information */}
            <div className="bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-900/5 rounded-3xl p-8 border border-white">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-id-card text-blue-500"></i> Personal Information
                </h3>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                >
                  <i className={`fas ${isEditing ? 'fa-times' : 'fa-pen'}`}></i>
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={!isEditing}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={!isEditing}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    disabled={!isEditing}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium"
                  >
                    <option value="">Prefer not to say</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {isEditing && (
                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-0.5 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Security Settings */}
            <div className="bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-900/5 rounded-3xl p-8 border border-white">
              <div className="mb-6 border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-shield-alt text-green-500"></i> Security
                </h3>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">New Password</label>
                    <input 
                      type="password" 
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      placeholder="••••••••"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Confirm Password</label>
                    <input 
                      type="password" 
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      placeholder="••••••••"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    type="submit"
                    disabled={isUpdatingPassword || !passwordData.newPassword}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-green-200 hover:shadow-green-300 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isUpdatingPassword ? <i className="fas fa-circle-notch animate-spin"></i> : "Update Password"}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;