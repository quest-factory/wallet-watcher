import { Button } from "@nextui-org/button";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-center">
      <NavBar />
      <Button>wallet watcher</Button>
    </main>
  );
}
