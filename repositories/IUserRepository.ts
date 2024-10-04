import { User } from "@/models/user/User";

export interface IUserRepository {
  getAllUsers(): Promise<User[]>
  getUserById(id: string): Promise<User | null>
  createUser(username: string, email: string, role: string): Promise<User>
  updateUser(id: string, username: string, email: string, role: string): Promise<User>
  deleteUser(id: string): Promise<User>
}
