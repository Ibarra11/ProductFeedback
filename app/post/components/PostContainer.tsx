import CustomLink from "@/components/CustomLink";
import GoBackLink from "@/components/GoBackLink";
import Post from "@/components/Post";
import { Post as Post_T, User } from "@/types";
import { Session } from "next-auth";
interface Props {
  post: Post_T;
  user: User | undefined;
}
export default function PostContainer({ post, user }: Props) {
  const isAuthor = user && post.user_id === user.id;
  return (
    <article className="isolate">
      <div className="flex justify-between mb-4">
        <GoBackLink className="text-brand-american_blue">Go Back</GoBackLink>
        {isAuthor && (
          <CustomLink variant="primary" href={`/edit-feedback/${post.id}`}>
            Edit Feedback
          </CustomLink>
        )}
      </div>

      <Post {...post} />
    </article>
  );
}
