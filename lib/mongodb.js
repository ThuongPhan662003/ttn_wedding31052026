import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10, // Giới hạn tối đa 10 kết nối đồng thời cho mỗi instance ngầm
  minPoolSize: 2,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Vui lòng thêm chuỗi kết nối MONGODB_URI vào file .env.local",
  );
}

if (process.env.NODE_ENV === "development") {
  // Trong môi trường dev (chạy npm run dev), dùng biến global để tránh tạo kết nối mới khi lưu lại code
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Trong môi trường production (khi deploy lên Vercel)
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
