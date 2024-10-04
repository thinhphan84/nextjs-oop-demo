import { supabase } from "@/lib/supabaseClient";
import { Role } from "@/models/Role";
import { Admin } from "@/models/user/Admin";
import { RegularUser } from "@/models/user/RegularUser";
import { SuperAdmin } from "@/models/user/SuperAdmin";
import { User } from "@/models/user/User";
import { injectable } from "inversify";
import { IUserRepository } from "../IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {
  async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data.map((user: { id: string; username: string; email: string; role: string; created_at: string }) => this.mapToUser(user));
  }

  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return this.mapToUser(data);
  }

  async createUser(
    username: string,
    email: string,
    role: string
  ): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .insert([{ username, email, role }])
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return this.mapToUser(data);
  }

  async updateUser(
    id: string,
    username: string,
    email: string,
    role: string
  ): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .update({ username, email, role })
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return this.mapToUser(data);
  }

  async deleteUser(id: string): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return this.mapToUser(data);
  }

  private mapToUser(user: { id: string; username: string; email: string; role: string; created_at: string }): User {
    const role = new Role(user.role);
    switch (role.name) {
      case "SuperAdmin":
        return new SuperAdmin(
          user.id,
          user.username,
          user.email,
          new Date(user.created_at)
        );
      case "Admin":
        return new Admin(
          user.id,
          user.username,
          user.email,
          new Date(user.created_at)
        );
      case "User":
        return new RegularUser(
          user.id,
          user.username,
          user.email,
          new Date(user.created_at)
        );
      default:
        throw new Error("Unknown role");
    }
  }
}
