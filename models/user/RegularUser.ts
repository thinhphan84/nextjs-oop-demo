import { Role } from "../Role";
import { User } from "./User";

export class RegularUser extends User {
  constructor(id: string, username: string, email: string, createdAt: Date) {
    super(id, username, email, new Role("User"), createdAt);
  }

  changeRole(newRole: Role): void {
    console.log(newRole);
    throw new Error("User is not allowed to change other users' role");
  }
}
