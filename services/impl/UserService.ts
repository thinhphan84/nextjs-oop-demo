import TYPES from "@/inversify/type";
import { User } from "@/models/user/User";
import type { IUserRepository } from "@/repositories/IUserRepository";
import { inject, injectable } from "inversify";
import { IUserService } from "../IUserService";

@injectable()
export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }

  async createUser(
    username: string,
    email: string,
    role: string
  ): Promise<User> {
    // Business logic if needed
    return this.userRepository.createUser(username, email, role);
  }

  async updateUser(
    id: string,
    username: string,
    email: string,
    role: string
  ): Promise<User> {
    // Business logic if needed
    return this.userRepository.updateUser(id, username, email, role);
  }

  async deleteUser(id: string): Promise<User> {
    // Business logic if needed
    return this.userRepository.deleteUser(id);
  }
}
