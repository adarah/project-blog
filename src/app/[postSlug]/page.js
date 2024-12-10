import BlogHero from "@/components/BlogHero";
import { getBlogPostList, loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./postSlug.module.css";
import CodeSnippet from "@/components/CodeSnippet";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";

export async function generateStaticParams() {
  const blogPosts = await getBlogPostList();
  return blogPosts.map((p) => ({ postSlug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { postSlug } = params;
  const { frontmatter } = await loadBlogPost(postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
    openGraph: {
      title: frontmatter.title,
      type: "article",
      description: frontmatter.abstract,
      publishedTime: frontmatter.publishedOn,
    },
  };
}

async function BlogPost({ params }) {
  const { postSlug } = params;
  const { content, frontmatter } = await loadBlogPost(postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
