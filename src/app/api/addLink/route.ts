import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { addLink } from "../../../server/queries";

interface reqBody {
  url: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const body = (await req.json()) as reqBody;

  try {
    // const link = await db.link.create({
    // data: {
    //  url,
    // },
    // });
    // return link;

    console.log("Request Body from route:", body.url);

    //res.status(200).json({ message: url });
  } catch (error) {
    console.error("Error creating post:", error);
    //res.status(500).json({ error: "Error creating post" });
  } finally {
    //await db.$disconnect();
    //res.status(200).json({ message: "Finally" });
    return NextResponse.json({ status: 200 });
  }
}
