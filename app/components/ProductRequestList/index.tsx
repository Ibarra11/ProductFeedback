import CounterButton from "../CounterButton";
import { FeedbackCategories } from "@/types";
import ProductRequestPost from "./ProductRequestPost";
import data from "../../../data.json";

const POSTS = data.productRequests;

type Comment = {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
};
interface Post {
  id: number;
  title: string;
  description: string;
  upvotes: number;
  comments?: Comment[];
  category: FeedbackCategories;
}

function ProductRequestList() {
  return (
    <div className="flex flex-col gap-5">
      {(POSTS as any as Post[]).map((post) => (
        <ProductRequestPost key={post.id} {...post} />
      ))}
    </div>
  );
}

export default ProductRequestList;
