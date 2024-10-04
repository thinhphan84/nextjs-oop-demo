import { Role } from '../Role'

export abstract class User {
  id: string
  username: string
  email: string
  role: Role
  createdAt: Date

  constructor(id: string, username: string, email: string, role: Role, createdAt: Date) {
    this.id = id
    this.username = username
    this.email = email
    this.role = role
    this.createdAt = createdAt
  }

  abstract changeRole(newRole: Role): void
}
