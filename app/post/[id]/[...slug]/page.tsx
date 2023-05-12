export default async function Page({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  return <div>{JSON.stringify(slug)}</div>;
}
