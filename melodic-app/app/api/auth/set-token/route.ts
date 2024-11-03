export async function POST(request: Request) {
  const res = await request.json();
  const token = res?.sessionToken as string;
  const role = res?.role as string;


  if (!token || !role) {
    return Response.json({ message: "Token or role not found." }, { status: 400 });
  }
  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": [
        `sessionToken=${token}; HttpOnly; Secure; Path=/; SameSite=Strict`,
        `role=${role}; HttpOnly; Secure; Path=/; SameSite=Strict`,
      ].join(", "),
    },
  });
}
