function PostSkeleton({ posts }: { posts: number }) {
  return (
    <div className={`post-skeleton_height w-full  overflow-y-hidden`}>
      {new Array(posts).fill(1).map((_, i) => {
        return (
          <div key={i} className="flex bg-white  py-7 px-8  gap-10 rounded-xl ">
            <div className="w-10 h-14 rounded-lg self-start bg-slate-500 "></div>
            <div className="flex-1 flex flex-col gap-4">
              <p className="w-full h-4 rounded-sm bg-slate-500 animate-pulse"></p>
              <p className="w-full h-4 rounded-sm bg-slate-500 animate-pulse"></p>
              <p className="w-full h-4 rounded-sm bg-slate-500 animate-pulse"></p>
              <p className="w-full h-4 rounded-sm bg-slate-500 animate-pulse"></p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PostSkeleton;
