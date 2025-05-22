import { NextResponse } from "next/server";
import { db } from "@/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, description, year, price, imageUrl, features } = body;

    if (!name || !description || !year || !price || !imageUrl) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const car = await db.car.create({
      data: {
        name,
        description,
        year,
        price,
        imageUrl,
        features: features || [],
      },
    });

    return NextResponse.json(car);
  } catch (error) {
    console.error("[CARS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
