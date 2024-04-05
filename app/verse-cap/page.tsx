import { getEdges, getNodes } from '@/flow/queries';
import Chart from './components/Chart';

export default async function verseCap() {
  const [nodes, edges] = await Promise.all([getNodes(), getEdges()]);

  return (
    <main
      className="w-screen border-2 border-red"
      style={{ height: 'calc(100vh - 65px)' }}
    >
      <Chart initialNodes={nodes} initialEdges={edges} />
    </main>
  );
}
