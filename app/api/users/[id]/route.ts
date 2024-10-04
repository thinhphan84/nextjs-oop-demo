import container from "@/inversify/container";
import TYPES from "@/inversify/type";
import { User } from "@/models/user/User";
import { IUserService } from "@/services/IUserService";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const userService = container.get<IUserService>(TYPES.IUserService);
    const user: User | null = await userService.getUserById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const { username, email, role } = await request.json();

    if (!username || !email || !role) {
      return NextResponse.json(
        { error: "Missing necessary information" },
        { status: 400 }
      );
    }

    const userService = container.get<IUserService>(TYPES.IUserService);
    const updatedUser: User = await userService.updateUser(
      id,
      username,
      email,
      role
    );

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const userService = container.get<IUserService>(TYPES.IUserService);
    const deletedUser: User = await userService.deleteUser(id);

    return NextResponse.json({ user: deletedUser }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
