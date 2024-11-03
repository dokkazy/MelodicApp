import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const role = cookieStore.get("role");
  if (!role) {
    return Response.json({ message: "Role not found." }, { status: 401 });
  }
  return Response.json(role, { status: 200 });
}
