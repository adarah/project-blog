import BlogHero from "@/components/BlogHero";
import { getBlogPostList, loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./postSlug.module.css";

export async function generateStaticParams() {
  const blogPosts = await getBlogPostList();
  return blogPosts.map((p) => ({ postSlug: p.slug }));
}

async function BlogPost({ params: { postSlug } }) {
  const { content, frontmatter } = await loadBlogPost(postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
