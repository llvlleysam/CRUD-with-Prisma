import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      typeof body.name !== "string" ||
      typeof body.family !== "string" ||
      typeof body.age !== "number" ||
      typeof body.liked !== "boolean"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid body. Required: name(string), family(string), age(number), liked(boolean)",
        },
        { status: 400 }
      );
    }

    const created = await prisma.user.create({
      data: {
        name: body.name,
        family: body.family,
        age: body.age,
        liked: body.liked,
      },
    });

    return NextResponse.json(created, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
