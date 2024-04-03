import NodeForm from '@/flow/components/NodeForm';
import { getEdges, getNodes } from '@/flow/queries';

export default async function verseCap() {
  const [nodes, edges] = await Promise.all([getNodes(), getEdges()]);

  return (
    <main className="p-2">
      <NodeForm nodes={nodes} />
    </main>
  );
}
