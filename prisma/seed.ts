import { PrismaClient, User, Post, Comment } from "@prisma/client";
const prisma = new PrismaClient();
import USERS_DATA from "../data/users.json";
import POSTS_DATA from "../data/posts.json";
import COMMENT_DATA from "../data/comments.json";
const users = USERS_DATA.users;
const posts: Post[] = POSTS_DATA.posts as Post[];
const comments: Comment[] = COMMENT_DATA.comments as any;
async function main() {
  const dbUsers: Array<User> = [];
  const dbPosts: Array<Post> = [];
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  for (const user of users) {
    dbUsers.push(
      await prisma.user.create({
        data: user,
      })
    );
  }

  for (const [index, post] of Object.entries(posts)) {
    const user_id = dbUsers[+index].id;

    dbPosts.push(
      await prisma.post.create({
        data: { ...post, user_id: dbUsers[+index].id },
      })
    );
  }

  for (const [index, comment] of Object.entries(comments)) {
    const user_id = dbUsers[comment.user_id].id;
    const post_id = dbPosts[comment.post_id].id;

    await prisma.comment.create({
      data: {
        ...comment,
        user_id,
        post_id,
      },
    });
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
