export class Role {
  name: string;

  constructor(name: string) {
    if (!["SuperAdmin", "Admin", "User"].includes(name)) {
      throw new Error("Invalid role name");
    }
    this.name = name;
  }
}
