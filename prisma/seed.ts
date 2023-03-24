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
    const user_fk_id = dbUsers[+index].user_id;

    dbPosts.push(
      await prisma.post.create({
        data: { ...post, user_fk_id },
      })
    );
  }

  function random(arr: any[]) {
    return Math.floor(Math.random() * arr.length);
  }

  for (const [index, comment] of Object.entries(comments)) {
    const randomUserFk = random(dbUsers);
    const randomPostFk = random(dbPosts);
    const user_fk_id = dbUsers[randomUserFk].user_id;
    const post_fk_id = dbPosts[randomPostFk].post_id;

    await prisma.comment.create({
      data: {
        ...comment,
        user_fk_id,
        post_fk_id,
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
