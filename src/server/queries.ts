import { db } from "./db";
import type { linkInfo } from "~/app/api/addLink/route";

export async function addLink(data: linkInfo) {
  try {
    const link = await db.link.create({
      data: {
        url: data.url,
        title: data.title,
        category: {
          connect: {
            id: data.id,
          },
        },
      },
    });

    console.log(link ? "Link created" : "Link not created");
  } catch (error) {
    console.error("Error creating post:", error);
  } finally {
    await db.$disconnect();
  }
}

export async function getLinks() {
  try {
    const links = await db.link.findMany();
    return links;
  } catch (error) {
    console.error("Error getting links:", error);
  } finally {
    await db.$disconnect();
  }
}

export async function getCategories() {
  try {
    const categories = await db.category.findMany({
      select: {
        name: true,
        id: true,
      },
    });

    return categories;
  } catch (error) {
    console.error("Error getting categories:", error);
  } finally {
    await db.$disconnect();
  }
}

export async function getCategoriesWithLinks() {
  try {
    const categories = await db.category.findMany({
      include: {
        links: true,
      },
    });

    return categories;
  } catch (error) {
    console.error("Error getting categories:", error);
  } finally {
    await db.$disconnect();
  }
}
