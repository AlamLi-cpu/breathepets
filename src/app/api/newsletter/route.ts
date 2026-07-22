import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email },
    });

    return NextResponse.json(subscriber, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error) {
      const prismaError = error as { code: string };
      if (prismaError.code === "P2002") {
        return NextResponse.json(
          { error: "Email already subscribed" },
          { status: 409 }
        );
      }
    }
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
