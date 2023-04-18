"use client";
import React from "react";
function useBodyScrollable() {
  const [bodyScrollable, setBodyScrollable] = React.useState(
    document.body.scrollHeight > window.innerHeight
  );

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setBodyScrollable(document.body.scrollHeight > window.innerHeight);
    });
    resizeObserver.observe(document.body);
    return () => {
      resizeObserver.unobserve(document.body);
    };
  }, []);

  return bodyScrollable;
}

export default useBodyScrollable;
