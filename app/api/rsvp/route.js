import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { slug, status } = await request.json();

    
if (!slug) {
  return NextResponse.json(
    { error: "Thiếu slug khách mời" },
    { status: 400 }
  );
}

if (!status) {
  return NextResponse.json(
    { error: "Thiếu trạng thái tham dự" },
    { status: 400 }
  );
}

const client = await clientPromise;
const db = client.db("wedding_db");

const result = await db.collection("guests").findOneAndUpdate(
  {
    slug,
  },
  {
    $set: {
      trang_thai: status, // yes | maybe | no
      da_phan_hoi: true,
      updatedAt: new Date(),
      ngay_phan_hoi: new Date(),
    },
  },
  {
    returnDocument: "after",
  }
);

if (!result?.value && !result) {
  return NextResponse.json(
    {
      error: "Không tìm thấy khách mời",
    },
    {
      status: 404,
    }
  );
}

return NextResponse.json({
  success: true,
  message: "Cập nhật RSVP thành công",
});
;
  } catch (error) {
    console.error("RSVP Error:", error);

    
return NextResponse.json(
  {
    error: "Lỗi hệ thống máy chủ",
  },
  {
    status: 500,
  }
);
;
  }
}
