import { db } from "./db";
import { classifyLink } from "./linkStuff";

export async function addLink(url: string) {
  // const categories = await getCategories();
  //   const linkCategory = await classifyLink(url, categories);

  try {
    // const link = await db.link.create({
    //   data: {
    //     url,},
    //   },
    // });
    // return link;

    return console.log("URL from addLink:", url);
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
    const categories = await db.category.findMany();

    return categories.map((category) => category.name);
  } catch (error) {
    console.error("Error getting categories:", error);
  } finally {
    await db.$disconnect();
  }
}
