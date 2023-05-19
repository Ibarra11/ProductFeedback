import CustomLink from "@/app/components/CustomLink";
import LinkWithChevronLeft from "@/app/components/LinkWithChevronLeft";
import Post from "@/app/components/Post";
import { Category, Status, User } from "@prisma/client";
interface Props {
  post: {
    createdAt: string;
    post_id: number;
    title: string;
    content: string;
    category: Category;
    status: Status;
    user_fk_id: number;
    _count: {
      upvotes: number;
      comments: number;
    };
  };
  user: User;
}

export default function PostContainer({ post, user }: Props) {
  const isAuthor = post.user_fk_id === user.user_id;
  return (
    <article className="border-2 border-red-500 isolate">
      <div className="flex justify-between border-2 border-green-500">
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
      <div className="border-2 border-green-400">
        <Post {...post} />
      </div>
    </article>
  );
}
