import Image from "next/image";
import AllTasksPage from "./pages/AllTasksPage";
import Tabs from "./components/Tabs";

export default function Home() {
  return (
    <>
      <Tabs/>
      <AllTasksPage/>
    </>
  );
}
