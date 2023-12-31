import { RouteDataArgs, createRouteData, useRouteData } from "solid-start";
import { PostMeta, getPosts } from "~/utils/posts";
import { styled } from "solid-styled-components";
import { Posts } from "~/components/post/Posts";
import { get, filter, includes, toLower } from "lodash";
import { createComputed, createSignal } from "solid-js";
import { search } from "~/store/search";

export const routeData = ({ location }: RouteDataArgs) => {
  return createRouteData(async () => {
    const posts = await getPosts();
    const search = get(location, ["search"]).replaceAll("?", "");

    return { posts, search };
  });
};

const Container = styled("main")`
  padding: 48px 8px;
`;

const Title = styled("h1")`
  text-align: center;
  margin: 8px 0;
`;

export default function Search() {
  const values = useRouteData<() => () => { posts: PostMeta[]; search: string }>();
  const [posts, setPosts] = createSignal(values()?.posts);

  createComputed(() => {
    const searchQuery = toLower(search());
    const items = filter(values()?.posts, (item) => {
      return includes(toLower(get(item, ["title"])), searchQuery);
    });

    setPosts(items);
  });

  return (
    <Container>
      <Title>Search</Title>
      <section>
        <Posts posts={posts} />
      </section>
    </Container>
  );
}
