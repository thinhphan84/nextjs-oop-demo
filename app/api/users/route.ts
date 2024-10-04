import container from "@/inversify/container";
import TYPES from "@/inversify/type";
import { User } from "@/models/user/User";
import { IUserService } from "@/services/IUserService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userService = container.get<IUserService>(TYPES.IUserService);
    const users: User[] = await userService.getAllUsers();
    console.log(users);
    return NextResponse.json({ users }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { username, email, role } = await request.json();

    if (!username || !email || !role) {
      return NextResponse.json(
        { error: "Missing necessary information" },
        { status: 400 }
      );
    }

    const userService = container.get<IUserService>(TYPES.IUserService);
    const newUser: User = await userService.createUser(username, email, role);

    return NextResponse.json({ users: [newUser] }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
