import { db } from "./db";

async function createPost() {
  try {
    const post = await db.post.create({
      data: {
        name: "My First Post",
        content: "Hello, world!",
      },
    });
    console.log("Post created:", post);
  } catch (error) {
    console.error("Error creating post:", error);
  } finally {
    await db.$disconnect();
  }
}

export async function getPosts() {
  try {
    const posts = await db.post.findMany();
    console.log("Posts:", posts);
    return posts;
  } catch (error) {
    console.error("Error getting posts:", error);
  } finally {
    await db.$disconnect();
  }
}
