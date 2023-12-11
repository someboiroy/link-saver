import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCategories, addLink } from "../../../server/queries";
import { classifyAndTitleLink } from "../../../server/linkStuff";

interface reqBody {
  url: string;
}

export interface linkInfo {
  url: string;
  title: string;
  category: string;
  id: number;
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
  const body = (await req.json()) as reqBody;
  const currCategories = await getCategories();
  const linkCategoryAndTitle = await classifyAndTitleLink(
    body.url,
    currCategories!.map((category) => category.name),
  );

  const linkInfo: linkInfo = {
    url: body.url,
    title: linkCategoryAndTitle.title,
    category: linkCategoryAndTitle.label,
    id: currCategories!.find(
      (category) => category.name === linkCategoryAndTitle.label,
    )!.id,
  };

  try {
    await addLink(linkInfo);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  } finally {
    return NextResponse.json({ status: 200 });
  }
}
