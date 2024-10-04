import { Role } from "../Role";
import { User } from "./User";

export class Admin extends User {
  constructor(id: string, username: string, email: string, createdAt: Date) {
    super(id, username, email, new Role("Admin"), createdAt);
  }

  changeRole(newRole: Role): void {
    console.log(newRole);
    throw new Error("Admin không có quyền thay đổi vai trò người dùng khác.");
  }
}
