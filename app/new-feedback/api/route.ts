import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Category } from ".prisma/client";
import { z } from "zod";
const FormSchema = z.object({
  title: z.string().nonempty(),
  category: z.nativeEnum(Category),
  detail: z.string().nonempty(),
});

interface FormError {
  field: keyof z.infer<typeof FormSchema>;
  message: string;
}
export async function POST(req: NextRequest) {
  try {
    const res = await req.json();
    const data = FormSchema.parse(res);
    return new NextResponse(null, {
      status: 200,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errors = e.issues.map(({ path, message }) => {
        return { field: path[0], message };
      });
      return new NextResponse(JSON.stringify({ errors }), {
        status: 400,
      });
    }
    return new NextResponse(
      JSON.stringify({ error: "invalid form submission" }),
      {
        status: 400,
      }
    );
  }

  // const data = await req.body;
}

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   console.log("hello");
//   NextResponse.json({ hello: "world" });
// }
