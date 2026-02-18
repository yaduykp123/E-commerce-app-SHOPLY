import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);


  let Navigate = useNavigate()
  
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:31234/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const toggleBlock = async (user) => {
    await axios.patch(
      `http://localhost:31234/users/${user.id}`,
      { isBlock: !user.isBlock }
    );

    
    fetchUsers();
  };

  return (
    <>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          User Management
        </h2>
        <p className="text-sm text-gray-500">
          Manage user access and permissions
        </p>
      </div>

     
      <div className="hidden md:grid grid-cols-5 gap-4
                      bg-gray-100 px-4 py-3 rounded-lg
                      text-sm font-semibold text-gray-600">
        <span>Email</span>
        <span>Role</span>
        <span>Status</span>
        <span>Account</span>
        <span className="text-right">Action</span>
      </div>

      
      <div className="space-y-3 mt-3 text-blue-500">
        {users.filter(user => user.role !== "admin").map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-1 md:grid-cols-5 gap-4
                       items-center bg-white p-4 rounded-xl shadow"
          >
            <span onClick={()=>Navigate(`/admin/users/${user.id}`)} className="font-medium border-4 border-gray-100 rounded-lg shadow-lg">{user.email}</span>

            <span className={`px-3 py-1 text-xs rounded-full w-fit
              ${user.role === "admin"
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"}`}>
              {user.role}
            </span>

            <span className={`px-3 py-1 text-xs rounded-full w-fit
              ${user.isBlock
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"}`}>
              {user.isBlock ? "Blocked" : "Active"}
            </span>

            <span className="text-sm text-gray-500">
              ID: #{user.id}
            </span>

            <div className="flex justify-end">
              {user.role !== "admin" && (
                <button
                  onClick={() => toggleBlock(user)}
                  className={`px-4 py-2 rounded-lg text-white
                    ${user.isBlock
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"}`}
                >
                  {user.isBlock ? "Unblock" : "Block"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
