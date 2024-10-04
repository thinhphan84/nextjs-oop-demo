import { Role } from "../Role";
import { User } from "./User";

export class SuperAdmin extends User {
  constructor(id: string, username: string, email: string, createdAt: Date) {
    super(id, username, email, new Role("SuperAdmin"), createdAt);
  }

  changeRole(newRole: Role): void {
    this.role = newRole;
  }
}
