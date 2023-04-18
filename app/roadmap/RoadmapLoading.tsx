import React from "react";
import useBodyScrollable from "./hooks/useBodyScrollable";
function RoadmapLoading() {
  const scrollable = useBodyScrollable();
  React.useEffect(() => {
    console.log(scrollable);
    // console.log(bodyScrollable);
    // const getScrollbarWidth = () =>
    //   window.innerWidth - document.documentElement.clientWidth;
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    console.log(scrollbarWidth);
    if (scrollbarWidth > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }

    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // console.log(scrollbarWidth);
    // if (bodyScrollable) {
    //   window.document.body.style.paddingRight = "0px";
    // } else {
    //   window.document.body.style.paddingRight = `${scrollbarWidth}px`;
    // }
  }, [scrollable]);
  // React.useEffect(() => {
  //     if()
  // }, []
  // )
  return <h1>Loading</h1>;
}

export default RoadmapLoading;
