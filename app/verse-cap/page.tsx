import { getEdges, getNodes } from '@/flow/queries';

export default async function verseCap() {
  const [nodes, edges] = await Promise.all([getNodes(), getEdges()]);

  return (
    <main className="w-full mx-auto px-3 md:px-0 md:max-w-[80%] my-10 space-y-12 ">
      VERSE CAP
    </main>
  );
}
