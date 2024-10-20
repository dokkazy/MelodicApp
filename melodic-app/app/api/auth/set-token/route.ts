export async function POST(request: Request) {

  const res = await request.json();
  const token = res?.sessionToken as string;
  
  if (!token) {
    return Response.json({ message: "Token not found." }, { status: 400 });
  }
  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${token}; HttpOnly; Secure; Path=/; SameSite=Strict`,
    },
  });
}
