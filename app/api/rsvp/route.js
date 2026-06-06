import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("wedding_db");

    return NextResponse.json({
      success: true,
      message: "Chức năng RSVP đã được tắt",
    });
  } catch (error) {
    console.error("RSVP Error:", error);

    return NextResponse.json(
      {
        error: "Lỗi hệ thống máy chủ",
      },
      {
        status: 500,
      },
    );
  }
}
