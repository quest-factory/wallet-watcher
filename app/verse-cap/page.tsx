import Chart from './components/Chart';

export default function verseCap() {
  return (
    <main
      className="w-screen border-2 border-red"
      style={{ height: 'calc(100vh - 65px)' }}
    >
      <Chart />
    </main>
  );
}
