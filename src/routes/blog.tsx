import { For } from "solid-js";
import { A, createRouteData, useRouteData } from "solid-start";
import { PostMeta, getPosts } from "~/utils/posts";
import { styled } from "solid-styled-components";
import { Post } from "~/components/post/Post";

export const routeData = () => {
  return createRouteData(getPosts);
};

const Title = styled("h1")`
  text-align: center;
  margin: 8px 0;
`;

export default function Blog() {
  const posts = useRouteData<() => () => PostMeta[]>();

  return (
    <div>
      <Title>Blog</Title>
      <section>
        <For each={posts()}>
          {(post) => (
            <Post
              title={post.title}
              categories={post.categories}
              date={post.date}
              slug={post.slug}
              description={post.description}
              readingTime={post.readingTime}
              thumbnailUrl={post.thumbnailUrl}
            />
          )}
        </For>
      </section>
    </div>
  );
}
