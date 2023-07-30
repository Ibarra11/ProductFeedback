import CustomLink from "@/app/components/CustomLink";
import LinkWithChevronLeft from "@/app/components/LinkWithChevronLeft";
import Post from "@/app/components/Post";
import { Post as Post_T } from "@/types";
import { Session } from "next-auth";
interface Props {
  post: Post_T;
  user: Session["user"];
}

export default function PostContainer({ post, user }: Props) {
  const isAuthor = post.user_id === user.id;
  return (
    <article className="isolate">
      <div className="flex justify-between mb-4">
        <LinkWithChevronLeft className="text-brand-american_blue">
          Go Back
        </LinkWithChevronLeft>
        {isAuthor && (
          <CustomLink
            variant="secondary"
            // @ts-ignore
            href={`/edit-feedback/${post.post_id}`}
          >
            Edit Feedback
          </CustomLink>
        )}
      </div>

      <Post user={user} {...post} />
    </article>
  );
}
