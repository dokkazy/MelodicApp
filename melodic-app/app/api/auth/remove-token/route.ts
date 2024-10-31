import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete("sessionToken");
  cookieStore.delete("role");
  return Response.json({
    status: 200,
    message: "Token removed",
  });
}
