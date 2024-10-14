"use client";

import CreateUserForm from "@/components/CreateUserForm";
import UserTable from "@/components/UserTable";
import { User } from "@/models/user/User";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        if (data.users) {
          setUsers(data.users);
        } else {
          alert(data.error);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (id: string) => {
    window.location.href = `/users/${id}`;
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you that you want to delete this user?")) {
      try {
        const res = await fetch(`/api/users/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (data.user) {
          setUsers(users.filter((user) => user.id !== id));
        } else {
          // alert(data.error);
          window.location.reload();
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("An unknown error occurred");
        }
      }
    }
  };

  const handleUserCreated = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        NextJS OOP CRUD Demo
      </h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div>
          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <CreateUserForm onUserCreated={handleUserCreated} />
        </div>
      )}
    </div>
  );
}
