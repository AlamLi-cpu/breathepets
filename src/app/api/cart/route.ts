import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

async function getSessionId(): Promise<string> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cartSessionId")?.value;
  if (sessionId) return sessionId;
  return "anonymous";
}

export async function GET() {
  try {
    const sessionId = await getSessionId();
    const items = await prisma.cartItem.findMany({
      where: { sessionId },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const sessionId = await getSessionId();
    const { productId, quantity } = await request.json();

    const existing = await prisma.cartItem.findFirst({
      where: { sessionId, productId },
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + (quantity ?? 1) },
        include: { product: true },
      });
      return NextResponse.json(updated);
    }

    const item = await prisma.cartItem.create({
      data: { sessionId, productId, quantity: quantity ?? 1 },
      include: { product: true },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const sessionId = await getSessionId();
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("id");

    if (itemId) {
      await prisma.cartItem.delete({
        where: { id: parseInt(itemId) },
      });
    } else {
      await prisma.cartItem.deleteMany({
        where: { sessionId },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove from cart" },
      { status: 500 }
    );
  }
}
