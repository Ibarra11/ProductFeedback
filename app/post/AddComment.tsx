"use client";
import React from "react";
import Button from "../components/Button";
function AddComment() {
  const [text, setText] = React.useState("");
  return (
    <div className="bg-white p-8 pt-6 rounded-lg">
      <h3 className="text-lg font-bold mb-6">Add Comment</h3>
      <textarea
        className="h-20 w-full mb-4 resize-none overflow-y-auto bg-brand-alice_blue rounded-md"
        disabled={text.length === 225}
        value={text}
        onChange={(ev) => setText(ev.target.value)}
      ></textarea>
      <div className="flex justify-between items-center">
        <span className="text-sm text-brand-american_blue">
          {225 - text.length} characters left
        </span>
        <Button className="bg-brand-purple text-brand-ghost_white">
          Post Comment
        </Button>
      </div>
    </div>
  );
}

export default AddComment;
