import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("wedding_db");

    const guests = await db
      .collection("guests_confirm")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(guests);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
