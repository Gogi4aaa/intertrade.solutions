import Navbar from "./layout/Navbar";
import StoresPage from "@/app/store"; // StoresPage를 import합니다.

function HomePage() {
  return (
    <div className="flex h-full w-full flex-col text-it-black">
      <Navbar />
      <StoresPage />
    </div>
  );
}

export default HomePage;
