import Topbar from "@/components/Topbar";
import LandingPage from "@/components/LandingPage";




export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <main className="flex-1">
        <LandingPage />
      </main>
    </div>
  );
}
