"use client";

import { User } from "@/models/user/User";
import { useState } from "react";

interface CreateUserFormProps {
  onUserCreated: (user: User) => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onUserCreated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, role }),
      });

      const data = await res.json();

      if (data.users) {
        onUserCreated(data.users[0]);
        setUsername("");
        setEmail("");
        setRole("User");
      } else {
        alert(data.error);
      }
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 p-4 border border-gray-300 rounded text-black"
    >
      <h2 className="text-xl mb-4">Create New User</h2>
      <div className="mb-4">
        <label className="block mb-1">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Enter username"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Enter email"
        />
      </div>
      <div className="mb-4 text-black">
        <label className="block mb-1">Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="SuperAdmin">SuperAdmin</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full text-white px-4 py-2 rounded ${
          loading ? "bg-gray-700" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {loading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
};

export default CreateUserForm;
