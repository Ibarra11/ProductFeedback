export async function PUT(req: Request) {
  const postId = new URL(req.url).pathname.split("/").slice(-2)[0];
  const data = await req.json();
  console.log(postId);
  console.log(data);
}
