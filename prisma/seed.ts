import { PrismaClient, User, Post } from "@prisma/client";
const prisma = new PrismaClient();
import USERS_DATA from "../data/users.json";
import POSTS_DATA from "../data/posts.json";
// import type { Post } from "@/data/types";
const users = USERS_DATA.users;
const posts: Post[] = POSTS_DATA.posts as any;

async function main() {
  const dbUsers: Array<User> = [];
  const dbPosts: Array<Post> = [];
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  for (const user of users) {
    dbUsers.push(
      await prisma.user.create({
        data: user,
      })
    );
  }

  for (const [index, post] of Object.entries(posts)) {
    dbPosts.push(
      await prisma.post.create({
        data: { ...post, user_id: dbUsers[+index].id },
      })
    );
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
