"use client";
import { Comment } from "@/lib/prisma";
import React from "react";

interface Context {
  comment: Comment;
  handleCommentChange: (comment: Comment) => void;
}

const CommentModalContext = React.createContext<Context | undefined>(undefined);

export const useCommentModalContext = () => {
  const context = React.useContext(CommentModalContext);
  return context;
};

export default function CommentModalProvider({
  children,
  comment,
  handleCommentChange,
}: React.PropsWithChildren<{
  comment: Comment;
  handleCommentChange: (comment: Comment) => void;
}>) {
  return (
    <CommentModalContext.Provider value={{ comment, handleCommentChange }}>
      {children}
    </CommentModalContext.Provider>
  );
}
