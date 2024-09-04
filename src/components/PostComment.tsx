import {useState} from "react"
import Giscus from "@giscus/react";

export default function PostComment() {
  const [theme,setTheme]=useState<string>(localStorage.getItem('theme')||"light")
  return (
    <Giscus
        repo="mohamedelbachir/giscus-blog"
        repoId="R_kgDOMs2sVg"
        category="Blog Post Comment"
        categoryId="DIC_kwDOMs2sVs4CiM56"
        mapping="title"
        strict="0"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme}
        lang="en"
        loading="lazy"
    />
  );
}
